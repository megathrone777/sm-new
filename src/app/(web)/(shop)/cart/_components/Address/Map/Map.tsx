"use client";
import React, { useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import Leaflet, { type LatLngExpression } from "leaflet";

import { bbox } from "@/utils";

import { markerClass, routeClass } from "./Map.css";

import type { TProps } from "./Map.types";

const kitchenCoords: [number, number] = [50.0861328, 14.4518119];
const kitchenBbox: [number, number][] = [kitchenCoords, [50.0993822, 14.4309572]];

const Map: React.FC<TProps> = ({ delivery: { position, type } }) => {
  const map = useMap();
  const polylineRef = useRef<Leaflet.Polyline | null>(null);

  const iconStart = Leaflet.divIcon({
    className: markerClass,
    html: renderToStaticMarkup(
      <svg
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
          fill="currentColor"
        />
      </svg>,
    ),
    iconAnchor: [7, 13],
    iconSize: [17, 30],
  });

  const iconEnd = Leaflet.divIcon({
    className: markerClass,
    html: renderToStaticMarkup(
      <svg
        viewBox="0 0 384 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0
            192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64
            0 1 1 0 128 64 64 0 1 1 0-128z
          "
          fill="currentColor"
        />
      </svg>,
    ),
    iconSize: [17, 30],
  });

  useEffect((): (() => void) | void => {
    if (type === "delivery" && position && position.length > 0) {
      map.fitBounds(bbox(position as [number, number][]), { padding: [20, 20] });

      const handleMoveEnd = () => {
        const pathEl = polylineRef.current?.getElement() as SVGPathElement | null;
        if (!pathEl) return;

        const length = pathEl.getTotalLength();
        pathEl.style.transition = "none";
        pathEl.style.strokeDasharray = `${length}`;
        pathEl.style.strokeDashoffset = `${length}`;

        void pathEl.getBoundingClientRect();

        pathEl.style.transition = "stroke-dashoffset 1s ease";
        pathEl.style.strokeDashoffset = "0";
      };

      map.once("moveend", handleMoveEnd);

      return () => {
        map.off("moveend", handleMoveEnd);
      };
    }

    map.fitBounds(bbox(kitchenBbox));
  }, [type, position, map]);

  return (
    <>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {type === "delivery" && position && position.length > 0 ? (
        <>
          <Polyline
            ref={polylineRef}
            className={routeClass}
            color="red"
            pathOptions={{ fillColor: "currentColor", stroke: true }}
            positions={position}
          />

          <Marker
            icon={iconStart}
            position={kitchenCoords}
          />

          <Marker
            icon={iconEnd}
            position={position[position.length - 1] as LatLngExpression}
          />
        </>
      ) : (
        <Marker
          icon={iconEnd}
          position={kitchenCoords}
        />
      )}
    </>
  );
};

export { Map };
