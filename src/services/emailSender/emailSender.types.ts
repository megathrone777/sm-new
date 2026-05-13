export interface TGenerateTemplateInput {
  order: TOrder;
  pickupAddress: string;
  shopSettings: Pick<TShopSettings, "businessName" | "email" | "phone">;
}
