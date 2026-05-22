"use client";
import React from "react";
import dynamic from "next/dynamic";

import type { TProps } from "./Overlay.types";

const MapLayout = dynamic(() => import("../MapLayout").then(({ MapLayout }) => MapLayout), {
  ssr: false,
});

const Map = dynamic(() => import("../Map").then(({ Map }) => Map), {
  ssr: false,
});

const Overlay: React.FC<TProps> = ({ initialOrders }) => (
  <MapLayout>
    <Map {...{ initialOrders }} />
  </MapLayout>
);

export { Overlay };
