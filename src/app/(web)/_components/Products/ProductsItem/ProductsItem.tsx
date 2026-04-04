import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { addToCart } from "@/app/(web)/_actions";

import { imageClass, imageHolderClass } from "./ProductsItem.css";

import type { TProps } from "./ProductsItem.types";

const ProductsItem: React.FC<TProps> = (product) => {
  const { imageUrl, price, requiredModifier, slug, title } = product;

  const formAction = async (): Promise<void> => {
    "use server";
    if (requiredModifier) {
      redirect(`/product/${slug}?requiredModifier=true`);
    }

    await addToCart({
      ...product,
      quantity: 1,
      totalPrice: price,
    });
  };

  return (
    <div style={{ border: "2px solid red" }}>
      <Link href={`/product/${slug}`}>
        <div className={imageHolderClass}>
          <Image
            alt={title}
            className={imageClass}
            fill
            src={`https://sushiman-office.cz${imageUrl}`}
          />
        </div>

        <p>
          Product: {title} - ({requiredModifier.toString()})
        </p>
      </Link>

      <form action={formAction}>
        <button type="submit">Add to cart</button>
      </form>
    </div>
  );
};

export { ProductsItem };
