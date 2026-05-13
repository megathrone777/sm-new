import React from "react";

import { store } from "@/store";
import { Icon } from "@/ui";

import { amountClass, iconClass, wrapperClass } from "./Queue.css";

const Queue: React.FC = async () => {
  const ordersInQueue = await store.orders.getInQueueCount();

  return (
    <div className={wrapperClass}>
      <Icon
        className={iconClass}
        id="exclamation"
      />

      <span>
        Fronta: <span className={amountClass}>{ordersInQueue}</span> objednávky před Vámi.
      </span>
    </div>
  );
};

export { Queue };
