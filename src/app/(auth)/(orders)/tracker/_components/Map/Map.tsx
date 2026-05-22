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
          <i
            style={{
              backgroundColor: online ? "greenyellow" : "gray",
              borderRadius: "50%",
              color: "#000",
              display: "block",
              fontSize: 17,
              fontStyle: "normal",
              fontWeight: "bold",
              height: 25,
              lineHeight: "25px",
              textAlign: "center",
              width: 25,
            }}
            title={name}
          >
            {index + 1}
          </i>
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
