import React, { useTransition } from "react";
import { toast } from "react-toastify";

import {
  addSaladsToCart,
  addSpicyToCart,
  addTopRollsToCart,
  addTopSetsToCart,
} from "@/app/(web)/_actions";
import { Icon } from "@/ui";

import {
  buttonClass,
  buttonIconClass,
  buttonLabelClass,
  circleClass,
  diamondClass,
  iconClass,
  wrapperClass,
} from "./Chips.css";

const Chips: React.FC = () => {
  const [isPending, startTransition] = useTransition();

  const handleVegetarianProducts = (): void => {
    startTransition(async () => {
      const { message, type } = await addSaladsToCart();

      toast(message, { type });
    });
  };

  const handleSpicyProducts = (): void => {
    startTransition(async () => {
      const { message, type } = await addSpicyToCart();

      toast(message, { type });
    });
  };

  const handleTopSets = (): void => {
    startTransition(async () => {
      const { message, type } = await addTopSetsToCart();

      toast(message, { type });
    });
  };

  const handleTopRolls = (): void => {
    startTransition(async () => {
      const { message, type } = await addTopRollsToCart();

      toast(message, { type });
    });
  };

  return (
    <div className={wrapperClass}>
      <button
        className={buttonClass}
        disabled={isPending}
        onClick={handleTopSets}
        type="button"
      >
        <span className={buttonIconClass}>
          <Icon
            className={iconClass}
            id="top"
          />
        </span>

        <span className={buttonLabelClass}>Přidat TOP sety</span>
      </button>

      <button
        className={buttonClass}
        disabled={isPending}
        onClick={handleTopRolls}
        type="button"
      >
        <span className={buttonIconClass}>
          <Icon
            className={iconClass}
            id="favourites"
          />
        </span>

        <span className={buttonLabelClass}>Nejoblíbenější</span>
      </button>

      <button
        className={buttonClass}
        onClick={handleSpicyProducts}
        type="button"
      >
        <span className={buttonIconClass}>
          <i className={diamondClass} />
        </span>

        <span className={buttonLabelClass}>Přidat pikantní</span>
      </button>

      <button
        className={buttonClass}
        onClick={handleVegetarianProducts}
        type="button"
      >
        <span className={buttonIconClass}>
          <i className={circleClass} />
        </span>

        <span className={buttonLabelClass}>Vegetariánské</span>
      </button>
    </div>
  );
};

export { Chips };
