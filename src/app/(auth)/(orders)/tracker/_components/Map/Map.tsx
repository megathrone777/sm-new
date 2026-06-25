"use client";
import React, { useEffect, useState } from "react";
import { Marker } from "react-map-gl/maplibre";

import { getCouriers } from "@/app/(auth)/(orders)/_actions";
import { useRealtime } from "@/hooks";
import { Icon } from "@/ui";

import { DeliveryMarkers } from "./DeliveryMarkers";
import { FitBounds } from "./FitBounds";

import { markerClass, markerIconClass } from "./Map.css";

import type { TProps } from "./Map.types";

const kitchenCoords: TLatLon = {
  lat: 50.0861328,
  lon: 14.4518119,
};
const pollIntervalMs: number = 10000;

const Map: React.FC<TProps> = ({ initialOrders }) => {
  const [couriers, setCouriers] = useState<TCourier[]>(() => getCouriers());
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

  const getPositions = (): [number, number][] => {
    // const deliveryPositions = orders
    //   .map(toDeliveryOrder)
    //   .filter(
    //     (order): order is NonNullable<ReturnType<typeof toDeliveryOrder>> =>
    //       order !== null && isPaymentVisible(order),
    //   )
    //   .map<[number, number]>(({ position }) => position);

    const courierPositions = couriers.map(({ latitude, longitude }): [number, number] => [
      latitude,
      longitude,
    ]);

    return [[kitchenCoords.lat, kitchenCoords.lon], ...courierPositions];
  };

  useEffect((): VoidFunction => {
    let active = true;
    const interval = setInterval((): void => {
      const data = getCouriers();

      if (active) setCouriers(data);
    }, pollIntervalMs);

    return (): void => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <FitBounds positions={getPositions()} />

      {couriers.map<React.ReactElement>(
        ({ id, latitude, longitude, name }: TCourier, index: number) => (
          <Marker
            key={`${id}-courier-marker`}
            {...{ latitude, longitude }}
            anchor="center"
          >
            <svg
              className={markerIconClass}
              height={30}
              viewBox="0 0 24 24"
              width={30}
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
                  fontSize: 10,
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
        ),
      )}

      <DeliveryMarkers {...{ orders }} />

      <Marker
        anchor="center"
        className={markerClass}
        latitude={kitchenCoords.lat}
        longitude={kitchenCoords.lon}
      >
        <Icon id="address" />
      </Marker>
    </>
  );
};

export { Map };
