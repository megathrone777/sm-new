"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactMap, { Marker, type LngLatLike, type MapRef } from "react-map-gl/maplibre";

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

const kitchenCoords: LngLatLike = {
  lat: 50.0861328,
  lon: 14.4518119,
};
const pollIntervalMs = 5000;
const proximityMeters = 500;

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

  const parts = deliveryCoordinates?.split(",").map(Number) ?? [];
  const deliveryLat = parts[0];
  const deliveryLng = parts[1];
  const hasDelivery =
    deliveryLat != null && deliveryLng != null && !isNaN(deliveryLat) && !isNaN(deliveryLng);
  const effectiveCourierPosition = status === "took" ? courierPosition : null;
  const isNearby =
    effectiveCourierPosition && hasDelivery
      ? haversine(
        effectiveCourierPosition.latitude,
        effectiveCourierPosition.longitude,
        deliveryLat,
        deliveryLng,
      ) < proximityMeters
      : false;
  const label = isNearby
    ? "Kurýr již přijíždí, buďte připraveni"
    : status === "took"
      ? "Kurýr vyzvedl objednávku, a už na cestě k Vám."
      : "Objednávka se připravuje...";
  const isMuted = status !== "took";

  const initialBounds: [[number, number], [number, number]] | undefined = hasDelivery
    ? [
        [
          Math.min(kitchenCoords.lon, deliveryLng) - 0.005,
          Math.min(kitchenCoords.lat, deliveryLat) - 0.005,
        ],
        [
          Math.max(kitchenCoords.lon, deliveryLng) + 0.005,
          Math.max(kitchenCoords.lat, deliveryLat) + 0.005,
        ],
      ]
    : undefined;

  useRealtime({
    events: ["orderStatusChanged"],

    onData: ({ data, event }): void => {
      if (event === "orderStatusChanged" && data.id === orderId) {
        setStatus(data.status);
      }
    },
  });

  useEffect(() => {
    if (status !== "took") return;

    let active = true;

    const poll = async (): Promise<void> => {
      const position = await getCourierPosition(courier);

      if (active && position) {
        setCourierPosition(position);
      }
    };

    void poll();
    const interval = setInterval(() => void poll(), pollIntervalMs);

    return (): void => {
      active = false;
      clearInterval(interval);
    };
  }, [status, courier]);

  useEffect((): void => {
    if (!mapRef.current || !effectiveCourierPosition) return;
    const { latitude, longitude } = effectiveCourierPosition;

    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 15,
    });
  }, [effectiveCourierPosition]);

  if (status === "placed") return null;

  return (
    <div className={wrapperClass}>
      <p className={labelClass}>{label}</p>

      <div className={mapClass[isMuted ? "muted" : "active"]}>
        <ReactMap
          attributionControl={false}
          initialViewState={
            initialBounds
              ? { bounds: initialBounds, fitBoundsOptions: { maxZoom: 14, padding: 30 } }
              : { latitude: kitchenCoords.lat, longitude: kitchenCoords.lon, zoom: 13 }
          }
          interactive={false}
          mapStyle="/api/tiles/styles/fiord"
          ref={mapRef}
          style={{ height: "100%", width: "100%" }}
        >
          {effectiveCourierPosition && (
            <Marker
              anchor="center"
              className={courierMarkerClass}
              latitude={effectiveCourierPosition.latitude}
              longitude={effectiveCourierPosition.longitude}
            >
              <Icon id="car" />
            </Marker>
          )}

          {status === "took" && hasDelivery && (
            <Marker
              anchor="center"
              className={markerClass}
              latitude={deliveryLat}
              longitude={deliveryLng}
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
