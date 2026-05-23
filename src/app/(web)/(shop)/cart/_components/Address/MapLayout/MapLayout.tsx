"use client";
import React from "react";
import ReactMap from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";

import { bbox } from "@/utils";

import { wrapperClass } from "./MapLayout.css";

import type { TProps } from "./MapLayout.types";

const KITCHEN_BBOX: [number, number][] = [
  [50.0861328, 14.4518119],
  [50.0993822, 14.4309572],
];

const toBounds = (points: [number, number][]): [[number, number], [number, number]] => {
  const bounds = bbox(points);
  const sw = bounds[0]!;
  const ne = bounds[1]!;

  return [
    [sw[1], sw[0]],
    [ne[1], ne[0]],
  ];
};

const MapLayout: React.FC<TProps> = ({ children, delivery: { position, type } }) => {
  const initialBounds =
    type === "delivery" && position && position.length > 0
      ? toBounds(position as [number, number][])
      : toBounds(KITCHEN_BBOX);

  return (
    <div
      className={wrapperClass}
      id="delivery-map"
    >
      <ReactMap
        attributionControl={false}
        initialViewState={{
          bounds: initialBounds,
          fitBoundsOptions: { maxZoom: 15, padding: 40 },
        }}
        interactive={false}
        mapStyle="/api/tiles/styles/fiord"
        style={{ height: "100%", maxHeight: "100%", width: "100%" }}
      >
        {children}
      </ReactMap>
    </div>
  );
};

export { MapLayout };
