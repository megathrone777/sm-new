export type TProps = TProduct &
  Pick<
    TProductCategory,
    "isPromotionActive" | "promotionDiscountAmount" | "promotionForEveryXProducts"
  >;
