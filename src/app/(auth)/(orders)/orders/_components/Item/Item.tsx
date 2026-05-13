import React from "react";

import { Additionals } from "./Additionals";
import { Client } from "./Client";
import { Controls } from "./Controls";
import { Delivery } from "./Delivery";
import { Heading } from "./Heading";
import { Payment } from "./Payment";
import { Products } from "./Products";

import { contentClass, noteClass, wrapperClass } from "./Item.css";

import type { TProps } from "./Item.types";

const Item: React.FC<TProps> = ({
  additionals,
  clientEmail,
  clientName,
  clientOrdersCount,
  clientPhoneNumber,
  courier,
  createdAt,
  cutleryCount,
  cutleryCountToPay,
  deliveryAddress,
  deliveryAddressDistrict,
  deliveryCoordinates,
  deliveryTime,
  deliveryTitle,
  deliveryType,
  id,
  isAdmin,
  note,
  onDelete,
  paymentType,
  products,
  promocode,
  promocodeDiscountPrice,
  status,
  totalPrice,
}) => (
  <div className={`${wrapperClass} ${status === "new" && deliveryTime ? "new time" : status}`}>
    <Heading
      {...{ createdAt, id, isAdmin, onDelete, status }}
      ordersCount={clientOrdersCount}
    />

    <div className={contentClass}>
      {products && products.length > 0 && <Products {...{ products }} />}

      {additionals && additionals.length > 0 && (
        <Additionals
          items={additionals}
          orderId={id}
        />
      )}

      {note.length > 0 && <p className={noteClass}>{note}</p>}

      <Client
        {...{
          cutleryCount,
          cutleryCountToPay,
          deliveryTime,
          deliveryTitle,
          deliveryType,
        }}
      />

      <Payment {...{ paymentType, promocode, promocodeDiscountPrice, totalPrice }} />

      <Delivery
        {...{
          courier,
          deliveryAddress,
          deliveryAddressDistrict,
          deliveryCoordinates,
          deliveryType,
          status,
        }}
        email={clientEmail}
        name={clientName}
        phone={`+${clientPhoneNumber}`}
      />
    </div>

    <Controls {...{ createdAt, deliveryTime, deliveryType, id, status }} />
  </div>
);

export { Item };
