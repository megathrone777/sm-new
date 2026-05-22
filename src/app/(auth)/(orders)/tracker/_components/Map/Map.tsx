"use client";
import React, { useMemo, useState } from "react";
import { Marker } from "react-map-gl/maplibre";

import { useRealtime } from "@/hooks";

import { DeliveryMarkers, isPaymentVisible, toDeliveryOrder } from "./DeliveryMarkers";
import { FitBounds } from "./FitBounds";

import { markerClass } from "./Map.css";

import type { TCourierState, TProps } from "./Map.types";

const kitchenPosition: [number, number] = [50.0861328, 14.4518119];
const courierColors = ["greenyellow", "orange"] as const;

const Map: React.FC<TProps> = ({ initialOrders }) => {
  const [courierState] = useState<TCourierState>({
    "courier-1": { latitude: 0, longitude: 0 },
    "courier-2": { latitude: 0, longitude: 0 },
  });
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

  const positions = useMemo<[number, number][]>(() => {
    const deliveryPositions = orders
      .map(toDeliveryOrder)
      .filter(
        (o): o is NonNullable<ReturnType<typeof toDeliveryOrder>> =>
          o !== null && isPaymentVisible(o),
      )
      .map((o) => o.position);

    const courierPositions = Object.values(courierState)
      .filter(({ latitude, longitude }) => latitude !== 0 || longitude !== 0)
      .map(({ latitude, longitude }): [number, number] => [latitude, longitude]);

    return [kitchenPosition, ...deliveryPositions, ...courierPositions];
  }, [orders, courierState]);

  return (
    <>
      <FitBounds {...{ positions }} />

      {Object.entries(courierState).map(
        ([courierId, { latitude, longitude }], index) =>
          (latitude !== 0 || longitude !== 0) && (
            <Marker
              anchor="center"
              key={`${courierId}-courier-marker`}
              latitude={latitude}
              longitude={longitude}
            >
              <i
                style={{
                  backgroundColor: courierColors[index] ?? "greenyellow",
                  borderRadius: "50%",
                  display: "block",
                  fontSize: 17,
                  fontStyle: "normal",
                  fontWeight: "bold",
                  height: 25,
                  lineHeight: "25px",
                  textAlign: "center",
                  width: 25,
                }}
              >
                {index + 1}
              </i>
            </Marker>
          ),
      )}

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
