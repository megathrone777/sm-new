"use client";
import React, { useEffect, useRef, useState } from "react";
import { Layer, Marker, Source, useMap, type LngLatLike } from "react-map-gl/maplibre";

import { colors } from "@/theme/variables";
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
  const prevAnimKeyRef = useRef<string>("");
  const shouldAnimateRef = useRef<boolean>(false);

  const animKey = `${Boolean(map)}:${type}:${JSON.stringify(position)}`;
  const lngLat =
    type === "delivery" && position && position.length >= 2
      ? position.map(([lat, lng]) => [lng, lat] as [number, number])
      : null;

  if (animKey !== prevAnimKeyRef.current) {
    const prevKey = prevAnimKeyRef.current;

    prevAnimKeyRef.current = animKey;

    if (!lngLat) {
      shouldAnimateRef.current = false;
    } else if (!prevKey.startsWith("true:")) {
      // Returning to page: map wasn't ready when position loaded, so initialViewState
      // already placed the camera — show the full line without animation.
      setAnimCoords(lngLat);
      shouldAnimateRef.current = false;
    } else {
      shouldAnimateRef.current = true;
    }
  }

  const displayCoords = lngLat ? animCoords : [];

  useEffect((): void => {
    if (!map) return;

    if (type === "delivery" && position && position.length > 0) {
      map.fitBounds(toLngLatBounds(position), { padding: 20 });

      return;
    }

    map.flyTo({ center: [kitchenCoords.lon, kitchenCoords.lat], zoom: 13 });
  }, [type, position, map]);

  useEffect(() => {
    if (!shouldAnimateRef.current || !map || !lngLat) return;

    const gl = map.getMap();
    const duration = 800;
    let startTime: null | number = null;
    let rafId: number | undefined;

    const animate = (timestamp: number): void => {
      if (startTime === null) startTime = timestamp;

      const t = Math.min((timestamp - startTime) / duration, 1);
      const idx = t * (lngLat.length - 1);
      const floor = Math.floor(idx);
      const frac = idx - floor;
      const visible = lngLat.slice(0, floor + 1);

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
      void gl.once("moveend", startAnimation);
    } else {
      startAnimation();
    }

    return (): void => {
      gl.off("moveend", startAnimation);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, [position, type, map]);

  const routeCoords = position;
  const lastCoord = routeCoords?.[routeCoords.length - 1];

  return (
    <>
      {type === "delivery" && routeCoords && routeCoords.length > 0 && lastCoord ? (
        <>
          {displayCoords.length >= 2 && (
            <Source
              data={{
                geometry: {
                  coordinates: displayCoords,
                  type: "LineString",
                },
                properties: {},
                type: "Feature",
              }}
              type="geojson"
            >
              <Layer
                paint={{ "line-color": colors.orangeDarker, "line-width": 3 }}
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
