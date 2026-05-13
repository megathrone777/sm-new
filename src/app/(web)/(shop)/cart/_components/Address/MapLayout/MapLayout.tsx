"use client";
import React from "react";
import { MapContainer } from "react-leaflet";

import { mapContainerClass } from "./MapLayout.css";

import type { TProps } from "./MapLayout.types";

const MapLayout: React.FC<TProps> = ({ children }) => (
  <MapContainer
    attributionControl={false}
    center={[50.0861328, 14.4518119]}
    className={mapContainerClass}
    dragging={false}
    id="delivery-map"
    zoom={18}
    zoomControl={false}
  >
    {children}
  </MapContainer>
);

export { MapLayout };
