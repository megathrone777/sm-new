"use client";
import React, { useEffect, useRef, useState } from "react";
import { Layer, Marker, Source, useMap } from "react-map-gl/maplibre";

import { bbox } from "@/utils";

import { markerClass } from "./Map.css";

import type { TProps } from "./Map.types";

const kitchenCoords: [number, number] = [50.0861328, 14.4518119];
const kitchenBbox: [number, number][] = [kitchenCoords, [50.0993822, 14.4309572]];

const toLngLatBounds = (
  points: [number, number][],
): [[number, number], [number, number]] => {
  const bounds = bbox(points);
  const sw = bounds[0]!;
  const ne = bounds[1]!;

  return [[sw[1], sw[0]], [ne[1], ne[0]]];
};

const Map: React.FC<TProps> = ({ delivery: { position, type } }) => {
  const { current: map } = useMap();
  const [drawProgress, setDrawProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (type !== "delivery" || !position || position.length === 0) return;

    setDrawProgress(0);
    const start = performance.now();
    const duration = 900;

    const animate = (now: number): void => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 2);
      setDrawProgress(eased);
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [type, position]);

  useEffect((): void => {
    if (!map) return;

    if (type === "delivery" && position && position.length > 0) {
      map.fitBounds(toLngLatBounds(position as [number, number][]), { padding: 20 });

      return;
    }

    map.fitBounds(toLngLatBounds(kitchenBbox));
  }, [type, position, map]);

  const routeCoords = position as [number, number][] | null;
  const lastCoord = routeCoords?.[routeCoords.length - 1];

  return (
    <>
      {type === "delivery" && routeCoords && routeCoords.length > 0 && lastCoord ? (
        <>
          <Source
            data={{
              geometry: {
                coordinates: routeCoords.map(([lat, lng]) => [lng, lat]),
                type: "LineString",
              },
              properties: {},
              type: "Feature",
            }}
            type="geojson"
          >
            <Layer
              layout={{ "line-cap": "round", "line-join": "round" }}
              paint={{
                "line-color": "#e63946",
                "line-dasharray": [drawProgress * 1000, Math.max(0.001, 1000 * (1 - drawProgress))],
                "line-width": 2,
              }}
              type="line"
            />
          </Source>

          <Marker
            anchor="center" latitude={kitchenCoords[0]}
            longitude={kitchenCoords[1]}
          >
            <svg
              className={markerClass} height={30}
              viewBox="0 0 512 512" width={17}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
                fill="currentColor"
              />
            </svg>
          </Marker>

          <Marker
            anchor="bottom" latitude={lastCoord[0]}
            longitude={lastCoord[1]}
          >
            <svg
              className={markerClass} height={30}
              viewBox="0 0 384 512" width={17}
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
          anchor="bottom" latitude={kitchenCoords[0]}
          longitude={kitchenCoords[1]}
        >
          <svg
            className={markerClass} height={30}
            viewBox="0 0 384 512" width={17}
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
