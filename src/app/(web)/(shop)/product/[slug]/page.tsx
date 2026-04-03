import React from "react";

import { Products } from "@/app/(web)/_components";
import { getCategoryById, getProductBySlug } from "@/helpers";

import { Details } from "./_components";

const Page: React.FC<PageProps<"/product/[slug]">> = async ({ params }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const category = await getCategoryById(product?.categoryId);

  const renderDetails = (): null | React.ReactElement => {
    if (category && product) {
      const { isPromotionActive, promotionDiscountAmount, promotionForEveryXProducts } = category;

      return (
        <Details
          {...product}
          {...{ isPromotionActive, promotionDiscountAmount, promotionForEveryXProducts }}
          // shopIsOpened={isAvailable && isOpened}
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

export default Page;
