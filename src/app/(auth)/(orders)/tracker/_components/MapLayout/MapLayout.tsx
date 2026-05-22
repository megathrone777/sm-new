"use client";
import React from "react";
import ReactMap from "react-map-gl/maplibre";

import type { TProps } from "./MapLayout.types";

const MapLayout: React.FC<TProps> = ({ children }) => (
  <ReactMap
    attributionControl={false}
    initialViewState={{
      latitude: 50.0938417,
      longitude: 14.4424,
      zoom: window.innerWidth > 1000 ? 14 : 11,
    }}
    mapStyle="https://tiles.openfreemap.org/styles/fiord"
    style={{ height: "100%", width: "100%" }}
  >
    {children}
  </ReactMap>
);

export { MapLayout };
