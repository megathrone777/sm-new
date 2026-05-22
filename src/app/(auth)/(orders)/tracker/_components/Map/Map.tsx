"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Marker } from "react-map-gl/maplibre";

import { getCouriers } from "@/app/(auth)/(orders)/_actions";
import { useRealtime } from "@/hooks";

import { DeliveryMarkers, isPaymentVisible, toDeliveryOrder } from "./DeliveryMarkers";
import { FitBounds } from "./FitBounds";

import { markerClass } from "./Map.css";

import type { TProps } from "./Map.types";

const kitchenPosition: [number, number] = [50.0861328, 14.4518119];
const POLL_INTERVAL_MS = 10000;

const Map: React.FC<TProps> = ({ initialOrders }) => {
  const [couriers, setCouriers] = useState<TCourier[]>([]);
  const [orders, setOrders] = useState<TOrder[]>(initialOrders);

  useRealtime({
    events: ["newOrder", "orderStatusChanged"],
    onData: ({ data, event }): void => {
      if (event === "newOrder") {
        if (data?.order) setOrders((prev) => [data.order, ...prev]);

        return;
      }

      if (event === "orderStatusChanged") {
        setOrders((prev) =>
          prev.map((o) => (o.id === data.id ? { ...o, status: data.status } : o)),
        );
      }
    },
  });

  useEffect(() => {
    let active = true;

    const fetchCouriers = async (): Promise<void> => {
      const data = await getCouriers();

      if (active) setCouriers(data);
    };

    fetchCouriers();
    const interval = setInterval(fetchCouriers, POLL_INTERVAL_MS);

    return (): void => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const positions = useMemo<[number, number][]>(() => {
    const deliveryPositions = orders
      .map(toDeliveryOrder)
      .filter(
        (o): o is NonNullable<ReturnType<typeof toDeliveryOrder>> =>
          o !== null && isPaymentVisible(o),
      )
      .map((o) => o.position);

    const courierPositions = couriers.map(
      ({ latitude, longitude }): [number, number] => [latitude, longitude],
    );

    return [kitchenPosition, ...deliveryPositions, ...courierPositions];
  }, [orders, couriers]);

  return (
    <>
      <FitBounds {...{ positions }} />

      {couriers.map(({ id, latitude, longitude, name, online }, index) => (
        <Marker
          anchor="center"
          key={`${id}-courier-marker`}
          latitude={latitude}
          longitude={longitude}
        >
          <svg
            height={28}
            style={{
              color: online ? "#ffd43b" : "gray",
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
            viewBox="0 0 24 24"
            width={28}
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{name}</title>
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
            <text
              dy=".35em"
              style={{
                fill: "currentColor",
                fontSize: 8,
                fontWeight: "bold",
                stroke: "none",
              }}
              textAnchor="middle"
              x="11"
              y="13"
            >
              {index + 1}
            </text>
          </svg>
        </Marker>
      ))}

      <DeliveryMarkers {...{ orders }} />

      <Marker
        anchor="center"
        latitude={kitchenPosition[0]}
        longitude={kitchenPosition[1]}
      >
        <svg
          className={markerClass}
          height={30}
          viewBox="0 0 512 512"
          width={17}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
            fill="currentColor"
          />
        </svg>
      </Marker>
    </>
  );
};

export { Map };
