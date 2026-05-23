"use client";
import React, { useEffect, useRef, useState } from "react";
import { Layer, Marker, Source, useMap, type LngLatLike } from "react-map-gl/maplibre";

import { Icon } from "@/ui";
import { bbox } from "@/utils";

import { markerClass } from "./Map.css";

import type { TProps } from "./Map.types";

const kitchenCoords: LngLatLike = {
  lat: 50.0861328,
  lon: 14.4518119,
};

const toLngLatBounds = (points: [number, number][]): [[number, number], [number, number]] => {
  const bounds = bbox(points);
  const sw = bounds[0]!;
  const ne = bounds[1]!;

  return [
    [sw[1], sw[0]],
    [ne[1], ne[0]],
  ];
};

const Map: React.FC<TProps> = ({ delivery: { position, type } }) => {
  const { current: map } = useMap();
  const [animCoords, setAnimCoords] = useState<[number, number][]>([]);
  const animKeyRef = useRef<string>("");

  useEffect((): void => {
    if (!map) return;

    if (type === "delivery" && position && position.length > 0) {
      map.fitBounds(toLngLatBounds(position as [number, number][]), { padding: 20 });

      return;
    }

    map.flyTo({ center: [kitchenCoords.lon, kitchenCoords.lat], zoom: 13 });
  }, [type, position, map]);

  useEffect(() => {
    const animKey = `${Boolean(map)}:${type}:${JSON.stringify(position)}`;

    if (animKey === animKeyRef.current) return;

    const prevAnimKey = animKeyRef.current;

    animKeyRef.current = animKey;

    if (!map || !position || position.length < 2 || type !== "delivery") {
      setAnimCoords([]);

      return;
    }

    const gl = map.getMap();
    const lngLat = (position as [number, number][]).map(
      ([lat, lng]) => [lng, lat] as [number, number],
    );

    // Returning to page: map wasn't ready when position loaded, so initialViewState
    // already placed the camera — show the full line without animation.
    if (!prevAnimKey.startsWith("true:")) {
      setAnimCoords(lngLat);

      return;
    }

    const duration = 800;
    let startTime: null | number = null;
    let rafId: number | undefined;

    const animate = (timestamp: number): void => {
      if (startTime === null) startTime = timestamp;

      const t = Math.min((timestamp - startTime) / duration, 1);
      const idx = t * (lngLat.length - 1);
      const floor = Math.floor(idx);
      const frac = idx - floor;
      const visible = lngLat.slice(0, floor + 1) as [number, number][];

      if (floor < lngLat.length - 1) {
        const a = lngLat[floor]!;
        const b = lngLat[floor + 1]!;

        visible.push([a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac]);
      }

      setAnimCoords(visible);

      if (t < 1) rafId = requestAnimationFrame(animate);
    };

    const startAnimation = (): void => {
      rafId = requestAnimationFrame(animate);
    };

    if (gl.isMoving()) {
      gl.once("moveend", startAnimation);
    } else {
      startAnimation();
    }

    return (): void => {
      gl.off("moveend", startAnimation);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, [position, type, map]);

  const routeCoords = position as [number, number][] | null;
  const lastCoord = routeCoords?.[routeCoords.length - 1];

  return (
    <>
      {type === "delivery" && routeCoords && routeCoords.length > 0 && lastCoord ? (
        <>
          {animCoords.length >= 2 && (
            <Source
              data={{
                geometry: {
                  coordinates: animCoords,
                  type: "LineString",
                },
                properties: {},
                type: "Feature",
              }}
              type="geojson"
            >
              <Layer
                paint={{ "line-color": "#b38200", "line-width": 3 }}
                type="line"
              />
            </Source>
          )}

          <Marker
            anchor="center"
            className={markerClass}
            latitude={kitchenCoords.lat}
            longitude={kitchenCoords.lon}
            offset={[3, 0]}
          >
            <Icon id="point" />
          </Marker>

          <Marker
            anchor="center"
            className={markerClass}
            latitude={lastCoord[0]}
            longitude={lastCoord[1]}
          >
            <Icon id="address" />
          </Marker>
        </>
      ) : (
        <Marker
          anchor="center"
          className={markerClass}
          latitude={kitchenCoords.lat}
          longitude={kitchenCoords.lon}
        >
          <Icon id="address" />
        </Marker>
      )}
    </>
  );
};

export { Map };
