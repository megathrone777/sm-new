import React from "react";
import { Link } from "next-view-transitions";

import { store } from "@/store";
import { Icon } from "@/ui";

import {
  amountClass,
  amountValueClass,
  iconClass,
  layoutClass,
  linkClass,
  wrapperClass,
} from "./Cart.css";

const Cart: React.FC = async () => {
  const cart = await store.cart.get();

  const getProductsTotal = (): number => {
    if (cart && !!cart.products.length) {
      return cart.products.reduce(
        (accumulator: number, { quantity }: TCartProduct) => accumulator + quantity,
        0,
      );
    }

    return 0;
  };

  return (
    <div className={wrapperClass}>
      <div className={layoutClass}>
        <Link
          aria-label="Go to cart"
          className={linkClass}
          href="/cart"
        >
          <Icon
            className={iconClass}
            id="cart"
          />
        </Link>

        <p className={amountClass}>
          <span className={amountValueClass}>{getProductsTotal()}</span>
        </p>
      </div>
    </div>
  );
};

export { Cart };
