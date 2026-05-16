import React from "react";

import { Products } from "@/app/(web)/_components";
import { store } from "@/store";

import { Details } from "./_components";

const Page: React.FC<PageProps<"/product/[slug]">> = async ({ params }) => {
  const { slug } = await params;
  const product = await store.products.getBySlug(slug);
  const category = await store.categories.getById(product?.categoryId);

  const renderDetails = (): null | React.ReactElement => {
    if (category && product) {
      const { isPromotionActive, promotionDiscountAmount, promotionForEveryXProducts } = category;

      return (
        <Details
          {...product}
          {...{ isPromotionActive, promotionDiscountAmount, promotionForEveryXProducts }}
        />
      );
    }

    return null;
  };

  return (
    <>
      {renderDetails()}
      <Products title="Chcete ještě něco přidat?" />
    </>
  );
};

export { generateMetadata } from "./metadata";
export default Page;
