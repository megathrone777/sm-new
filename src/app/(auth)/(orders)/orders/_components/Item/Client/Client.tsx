import React from "react";
import moment from "moment";

import { itemClass, labelClass, valueClass } from "../Item.css";
import { typeClass } from "./Client.css";

import type { TProps } from "./Client.types";

const Client: React.FC<TProps> = ({
  cutleryCount,
  cutleryCountToPay,
  deliveryTime,
  deliveryTitle,
  deliveryType,
}) => (
  <>
    <p className={itemClass}>
      <span className={labelClass}>Приборы:</span>
      <span className={valueClass}>
        {cutleryCount}
        {cutleryCountToPay > 0 && (
          <>
            {" "}
            ({cutleryCountToPay} {cutleryCountToPay > 1 ? "платных" : "платный"})
          </>
        )}
      </span>
    </p>

    <p className={itemClass}>
      <span className={valueClass}>
        {deliveryType === "pickup" ? (
          <span className={`${typeClass} ${deliveryType}`}>Самовывоз</span>
        ) : (
          <>
            <span className={`${typeClass} ${deliveryType}`}>Доставка</span> {deliveryTitle}
          </>
        )}{" "}
        {deliveryTime ? ` на ${moment(deliveryTime, "HH:mm").format("HH:mm")}` : " на Сейчас"}
      </span>
    </p>
  </>
);

export { Client };
