import React from "react";

import { Icon } from "@/ui";

import { amountClass, iconClass, wrapperClass } from "./Queue.css";

const Queue: React.FC = () => {
  const ordersInQueue = 7;

  return (
    <div className={wrapperClass}>
      <Icon
        className={iconClass}
        id="exclamation"
      />

      <span>
        Fronta: <span className={amountClass}>{ordersInQueue ? ordersInQueue : 0}</span>objednávky
        před Vámi.
      </span>
    </div>
  );
};

export { Queue };
