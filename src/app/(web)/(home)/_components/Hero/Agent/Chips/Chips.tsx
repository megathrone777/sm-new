import React, { useTransition } from "react";
import { toast } from "react-toastify";

import { addTopRollsToCart, addTopSetsToCart } from "@/app/(web)/_actions";
import { Icon } from "@/ui";

import { buttonClass, circleClass, diamondClass, iconClass, wrapperClass } from "./Chips.css";

const Chips: React.FC = () => {
  const [isPending, startTransition] = useTransition();

  // const handleSpicyRolls = (): void => {
  //   startTransition(async () => {});
  // };

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
  );
};

export { Chips };
