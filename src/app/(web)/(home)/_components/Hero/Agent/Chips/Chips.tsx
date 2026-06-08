"use client";
import React, { useState, useTransition } from "react";

import { Icon } from "@/ui";

import { addTopRollsToCart, addTopSetsToCart } from "../actions";

import { responseClass } from "../FormLayout/FormLayout.css";
import { buttonClass, circleClass, diamondClass, iconClass, wrapperClass } from "./Chips.css";

const Chips: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>("");

  const handleTopSets = (): void => {
    startTransition(async () => {
      const result = await addTopSetsToCart();

      setMessage(result);
    });
  };

  const handleTopRolls = (): void => {
    startTransition(async () => {
      const result = await addTopRollsToCart();

      setMessage(result);
    });
  };

  return (
    <>
      {message && <p className={responseClass}>{message}</p>}

      <div className={wrapperClass}>
        <button
          className={buttonClass}
          disabled={isPending}
          onClick={handleTopSets}
          type="button"
        >
          <Icon
            className={iconClass}
            id="top"
          />

          <span>Přidat TOP sety</span>
        </button>

        <button
          className={buttonClass}
          disabled={isPending}
          onClick={handleTopRolls}
          type="button"
        >
          <Icon
            className={iconClass}
            id="favourites"
          />

          <span>Nejoblíbenější</span>
        </button>

        <button
          className={buttonClass}
          type="button"
        >
          <i className={diamondClass} />
          <span>Pikantní rolky</span>
        </button>

        <button
          className={buttonClass}
          type="button"
        >
          <i className={circleClass} />
          <span>Vegetariánské</span>
        </button>
      </div>
    </>
  );
};

export { Chips };
