"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactMap, { Marker, type MapRef } from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";

import { getCourierPosition } from "@/app/(web)/_actions";
import { useRealtime } from "@/hooks";
import { Icon } from "@/ui";

import {
  courierMarkerClass,
  labelClass,
  mapClass,
  markerClass,
  wrapperClass,
} from "./Progress.css";

import type { TProps } from "./Progress.types";

const kitchenPosition: [number, number] = [50.0861328, 14.4518119];
const pollIntervalMs = 5000;
// const proximityMeters = 500;
const proximityMeters = 150;

const haversine = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const Progress: React.FC<TProps> = ({ courier, deliveryCoordinates, initialStatus, orderId }) => {
  const mapRef = useRef<MapRef>(null);
  const [courierPosition, setCourierPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [status, setStatus] = useState<TOrderStatus>(initialStatus);

  useRealtime({
    events: ["orderStatusChanged"],

    onData: ({ data, event }): void => {
      if (event === "orderStatusChanged" && data.id === orderId) {
        setStatus(data.status);
      }
    },
  });

  const parts = deliveryCoordinates?.split(",").map(Number) ?? [];
  const deliveryLat = parts[0];
  const deliveryLng = parts[1];
  const hasDelivery =
    deliveryLat != null && deliveryLng != null && !isNaN(deliveryLat) && !isNaN(deliveryLng);

  const isNearby =
    courierPosition && hasDelivery
      ? haversine(courierPosition.latitude, courierPosition.longitude, deliveryLat!, deliveryLng!) <
        proximityMeters
      : false;

  const label = isNearby
    ? "Kurýr již přijíždí, buďte připraveni"
    : status === "took"
      ? "Kurýr vyzvedl objednávku, a už na cestě k Vám."
      : "Připravuje se...";
  const isMuted = status !== "took";

  const initialBounds: [[number, number], [number, number]] | undefined = hasDelivery
    ? [
        [
          Math.min(kitchenPosition[1], deliveryLng!) - 0.005,
          Math.min(kitchenPosition[0], deliveryLat!) - 0.005,
        ],
        [
          Math.max(kitchenPosition[1], deliveryLng!) + 0.005,
          Math.max(kitchenPosition[0], deliveryLat!) + 0.005,
        ],
      ]
    : undefined;

  useEffect((): (() => void) | void => {
    if (status !== "took") {
      setCourierPosition(null);

      return;
    }

    let active = true;

    const poll = async (): Promise<void> => {
      const position = await getCourierPosition(courier);

      if (active && position) {
        setCourierPosition(position);
      }
    };

    poll();
    const interval = setInterval(poll, pollIntervalMs);

    return (): void => {
      active = false;
      clearInterval(interval);
    };
  }, [status, courier]);

  useEffect((): void => {
    if (!mapRef.current || !courierPosition) return;
    const { latitude, longitude } = courierPosition;

    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 15,
    });
  }, [courierPosition]);

  return (
    <div className={wrapperClass}>
      <p className={labelClass}>{label}</p>

      <div className={mapClass[isMuted ? "muted" : "active"]}>
        <ReactMap
          attributionControl={false}
          initialViewState={
            initialBounds
              ? { bounds: initialBounds, fitBoundsOptions: { maxZoom: 14, padding: 30 } }
              : { latitude: kitchenPosition[0], longitude: kitchenPosition[1], zoom: 13 }
          }
          interactive={false}
          mapStyle="https://tiles.openfreemap.org/styles/fiord"
          ref={mapRef}
          style={{ height: "100%", width: "100%" }}
        >
          {status === "took" && courierPosition && (
            <Marker
              anchor="center"
              className={courierMarkerClass}
              latitude={courierPosition.latitude}
              longitude={courierPosition.longitude}
            >
              <svg
                height={30}
                style={{
                  color: "#ffd43b",
                  fill: "none",
                  stroke: "currentColor",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                }}
                viewBox="0 0 24 24"
                width={30}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle
                  cx="7"
                  cy="17"
                  r="2"
                />
                <path d="M9 17h6" />
                <circle
                  cx="17"
                  cy="17"
                  r="2"
                />
              </svg>
            </Marker>
          )}

          {status === "took" && hasDelivery && (
            <Marker
              anchor="center"
              className={markerClass}
              latitude={deliveryLat!}
              longitude={deliveryLng!}
            >
              <Icon id="address" />
            </Marker>
          )}
        </ReactMap>
      </div>
    </div>
  );
};

export { Progress };
