"use client";
import { useEffect, useRef } from "react";
import { useMap } from "react-map-gl/maplibre";

import type React from "react";

type TProps = { positions: [number, number][] };

const FitBounds: React.FC<TProps> = ({ positions }) => {
  const { current: map } = useMap();
  const prevRef = useRef(0);

  useEffect(() => {
    if (!map || positions.length < 2 || positions.length === prevRef.current) return;
    prevRef.current = positions.length;

    const lats = positions.map(([lat]) => lat);
    const lngs = positions.map(([, lng]) => lng);

    map.fitBounds(
      [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
      { padding: 40 },
    );
  }, [map, positions]);

  return null;
};

export { FitBounds };
