"use client";
import React, { useEffect, useState } from "react";
import { Layer, Marker, Source, useMap } from "react-map-gl/maplibre";

import { bbox } from "@/utils";

import { markerClass } from "./Map.css";

import type { TProps } from "./Map.types";

const kitchenCoords: [number, number] = [50.0861328, 14.4518119];

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

  useEffect((): void => {
    if (!map) return;

    if (type === "delivery" && position && position.length > 0) {
      map.fitBounds(toLngLatBounds(position as [number, number][]), { padding: 20 });

      return;
    }

    map.flyTo({ center: [kitchenCoords[1], kitchenCoords[0]], zoom: 13 });
  }, [type, position, map]);

  useEffect(() => {
    if (!map || !position || position.length < 2 || type !== "delivery") {
      setAnimCoords([]);

      return;
    }

    const gl = map.getMap();
    const lngLat = (position as [number, number][]).map(
      ([lat, lng]) => [lng, lat] as [number, number],
    );
    const duration = 900;
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

    gl.once("moveend", startAnimation);

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
                paint={{ "line-color": "#7a5500", "line-width": 3 }}
                type="line"
              />
            </Source>
          )}

          <Marker
            anchor="center"
            latitude={kitchenCoords[0]}
            longitude={kitchenCoords[1]}
            offset={[3, 0]}
          >
            <svg
              className={markerClass}
              height={30}
              viewBox="0 0 512 512"
              width={17}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
                fill="currentColor"
              />
            </svg>
          </Marker>

          <Marker
            anchor="center"
            latitude={lastCoord[0]}
            longitude={lastCoord[1]}
          >
            <svg
              className={markerClass}
              height={30}
              viewBox="0 0 384 512"
              width={17}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0
                  192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64
                  0 1 1 0 128 64 64 0 1 1 0-128z"
                fill="currentColor"
              />
            </svg>
          </Marker>
        </>
      ) : (
        <Marker
          anchor="center"
          latitude={kitchenCoords[0]}
          longitude={kitchenCoords[1]}
        >
          <svg
            className={markerClass}
            height={30}
            viewBox="0 0 384 512"
            width={17}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0
                192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64
                0 1 1 0 128 64 64 0 1 1 0-128z"
              fill="currentColor"
            />
          </svg>
        </Marker>
      )}
    </>
  );
};

export { Map };
