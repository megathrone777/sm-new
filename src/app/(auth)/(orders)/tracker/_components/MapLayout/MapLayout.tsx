"use client";
import React from "react";
import ReactMap from "react-map-gl/maplibre";
// import maplibregl from "maplibre-gl";

import type { TProps } from "./MapLayout.types";

const MapLayout: React.FC<TProps> = ({ children }) => (
  <ReactMap
    attributionControl={false}
    initialViewState={{
      latitude: 50.0938417,
      longitude: 14.4424,
      zoom: window.innerWidth > 1000 ? 14 : 11,
    }}
    // mapLib={maplibregl}
    mapStyle="/api/tiles/styles/fiord"
    style={{ height: "100%", width: "100%" }}
  >
    {/* <Source
      tiles={[
        "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38",
      ]}
      type="raster"
    >
      <Layer type="raster" />
    </Source> */}

    {children}
  </ReactMap>
);

export { MapLayout };
