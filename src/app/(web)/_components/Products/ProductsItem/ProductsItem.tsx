import React from "react";
import Link from "next/link";

// import { cartActions } from "@/app/actions";
import type { TProps } from "./ProductsItem.types";

const ProductsItem: React.FC<TProps> = (product) => {
  const { imageUrl, slug, sortOrder, title } = product;

  return (
    <div style={{ border: "2px solid red" }}>
      <img
        alt={title}
        src={`https://sushiman-office.cz${imageUrl}`}
        style={{
          display: "block",
          height: 200,
        }}
      />

      <Link href={`/product/${slug}`}>
        Product: {title} - ({sortOrder})
      </Link>

      <button
        // onClick={async (): Promise<void> => {
        //   await cartActions.addProduct({
        //     ...product,
        //     isPromotionActive: false,
        //     quantity: 1,
        //     totalPrice: product.price,
        //   });
        // }}
        type="button"
      >
        Add to cart
      </button>
    </div>
  );
};

export { ProductsItem };
