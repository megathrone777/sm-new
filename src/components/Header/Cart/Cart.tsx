import React from "react";
import Link from "next/link";

// import { useCart } from "~/hooks";
// import { ThemeComponent } from "@/theme";
import { wrapperClass, linkClass, iconClass } from "./Cart.css";

const Cart: React.FC = () => {
  // const { products } = useCart();

  // const getAmount = (): number => {
  //   if (!!products.length) {
  //     return products.reduce(
  //       (accumulator: number, { quantity }: TCartProduct) => accumulator + quantity,
  //       0,
  //     );
  //   }

  //   return 0;
  // };

  return (
    <div className={wrapperClass}>
      <Link
        className={linkClass}
        href="#"
      >
        <span className={iconClass}>
          {/* <ThemeComponent.Icon iconID="cartIcon" /> */}
        </span>

        <span>Cart</span>
      </Link>

      <span className={iconClass}>{1}</span>
    </div>
  );
};

export { Cart };
