"use client";
import React from "react";
import ReactMap, { type LngLatLike } from "react-map-gl/maplibre";

import { bbox } from "@/utils";

import { wrapperClass } from "./MapLayout.css";

import type { TProps } from "./MapLayout.types";

const kitchenCoords: LngLatLike = { lat: 50.0861328, lon: 14.4518119 };

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
  const hasRoute = type === "delivery" && position && position.length > 0;

  return (
    <div
      className={wrapperClass}
      id="delivery-map"
    >
      <ReactMap
        attributionControl={false}
        initialViewState={
          hasRoute
            ? {
              bounds: toBounds(position),
              fitBoundsOptions: { maxZoom: 15, padding: 40 },
            }
            : {
              latitude: kitchenCoords.lat,
              longitude: kitchenCoords.lon,
              zoom: 13,
            }
        }
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
