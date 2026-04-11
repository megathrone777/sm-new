import React from "react";
import Link from "next/link";

import { cartHelpers } from "@/helpers/cart";
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
  const cart = await cartHelpers.getCart();

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
