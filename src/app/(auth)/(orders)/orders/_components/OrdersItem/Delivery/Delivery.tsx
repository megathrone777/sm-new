"use client";
import React from "react";

import { itemClass, labelClass, valueClass } from "../OrdersItem.css";
import { linkClass, wazeClass } from "./Delivery.css";

import type { TProps } from "./Delivery.types";

const Delivery: React.FC<TProps> = ({
  courier,
  deliveryAddress,
  deliveryAddressDistrict,
  deliveryCoordinates,
  deliveryType,
  email,
  name,
  phone,
  status,
}) => {
  const handleCopyClick = async ({
    currentTarget,
  }: React.SyntheticEvent<HTMLSpanElement>): Promise<void> => {
    const value = currentTarget.dataset.value ?? "";

    await navigator.clipboard.writeText(value);
  };

  return (
    <>
      <p className={itemClass}>
        <span className={labelClass}>
          <a
            className={linkClass}
            href={`tel:${phone}`}
          >
            {phone}
          </a>
        </span>

        <span
          className={valueClass}
          data-value={name}
          onClick={handleCopyClick}
        >
          {name}
        </span>
      </p>

      <p className={itemClass}>
        <span
          className={`${valueClass} normal`}
          data-value={email}
          onClick={handleCopyClick}
        >
          {email}
        </span>
      </p>

      {deliveryType === "delivery" && (
        <p className={`${itemClass} wrap`}>
          <span
            className={valueClass}
            data-value={deliveryAddress}
            onClick={handleCopyClick}
          >
            {deliveryAddress} {deliveryAddressDistrict}
            <a
              className={wazeClass}
              href={`https://waze.com/ul?ll=${deliveryCoordinates}&navigate=yes`}
              rel="noreferrer"
              target="_blank"
            >
              [waze]
            </a>
          </span>
        </p>
      )}

      {deliveryType === "delivery" && (status === "took" || status === "placed") && courier && (
        <p className={itemClass}>
          <span className={labelClass}>Курьер:</span>
          <span className={valueClass}>{courier}</span>
        </p>
      )}
    </>
  );
};

export { Delivery };
