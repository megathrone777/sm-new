"use client";
import React from "react";
import { Marker } from "react-map-gl/maplibre";

import type { TDeliveryOrder, TProps } from "./DeliveryMarkers.types";

const STATUS_COLORS: Record<TOrderStatus, string> = {
  done: "gray",
  new: "red",
  placed: "gray",
  ready: "#21a235",
  started: "#3f5cc7",
  took: "#edaa1a",
};

export const toDeliveryOrder = (order: TOrder): null | TDeliveryOrder => {
  if (order.deliveryType !== "delivery" || !order.deliveryCoordinates) return null;
  const [lat, lng] = order.deliveryCoordinates.split(",").map(Number);

  if (!lat || !lng || isNaN(lat) || isNaN(lng)) return null;

  return {
    deliveryTime: order.deliveryTime,
    id: order.id,
    onlinePaymentStatus: order.onlinePaymentStatus,
    paymentType: order.paymentType,
    position: [lat, lng],
    status: order.status,
  };
};

export const isPaymentVisible = ({ onlinePaymentStatus, paymentType }: TDeliveryOrder): boolean =>
  (paymentType === "card" && onlinePaymentStatus === "PAID") ||
  paymentType === "cardAfterDelivery" ||
  paymentType === "cash";

const DeliveryMarkers: React.FC<TProps> = ({ orders }) => (
  <>
    {orders
      .map(toDeliveryOrder)
      .filter(
        (order: null | TDeliveryOrder): order is TDeliveryOrder =>
          order !== null && isPaymentVisible(order),
      )
      .map(({ deliveryTime, id, position: [latitude, longitude], status }: TDeliveryOrder) => {
        const markerBg =
          status === "new" && deliveryTime ? "darkviolet" : STATUS_COLORS[status];

        return (
          <Marker
            anchor="center"
            key={`${id}-delivery-marker`}
            latitude={latitude}
            longitude={longitude}
          >
            <i
              style={{
                backgroundColor: markerBg,
                borderRadius: "50%",
                color: "white",
                display: "inline-block",
                fontSize: 17,
                fontStyle: "normal",
                fontWeight: "bold",
                height: 25,
                lineHeight: "25px",
                paddingInline: 6,
                textAlign: "center",
              }}
            >
              {id}
            </i>
          </Marker>
        );
      })}
  </>
);

export { DeliveryMarkers };
