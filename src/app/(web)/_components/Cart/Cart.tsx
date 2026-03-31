import React from "react";
import Link from "next/link";

import { getCart } from "@/helpers";
import { Icon } from "@/theme/components";

import { wrapperClass, layoutClass, linkClass, iconClass, amountClass } from "./Cart.css";

const Cart: React.FC = async () => {
  const cart = await getCart();

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

        <p className={amountClass}>{getProductsTotal()}</p>
      </div>
    </div>
  );
};

export { Cart };
