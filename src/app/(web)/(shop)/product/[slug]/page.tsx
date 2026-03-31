import React from "react";

import { getProductBySlug } from "@/helpers";

import { Details } from "./_components";

import type { TProps } from "./types";

const Page: React.FC<TProps> = async ({ params }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return (
    <>
      {product && (
        <Details
          {...product}
          // isPromotionActive={currentCategory?.isPromotionActive || false}
          // promotionDiscountAmount={currentCategory?.promotionDiscountAmount || 1}
          // promotionForEveryXProducts={currentCategory?.promotionForEveryXProducts || 1}
          // shopIsOpened={isAvailable && isOpened}
        />
      )}
    </>
  );
};

export default Page;
