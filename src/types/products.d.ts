declare global {
  interface TAdditional {
    id: number;
    orderIndex: number;
    priceCZK: number;
    quantity: number;
    title: string;
    totalPrice: number;
  }

  interface TProductCategory {
    id: number;
    image: string;
    isPromotionActive: boolean;
    modifiersTitle: string;
    products: TProduct[];
    promotionDiscountAmount: number;
    promotionForEveryXProducts: number;
    title: string;
  }

  interface TSubmodifier {
    id: number;
    title: string;
  }

  interface TModifier {
    id: number;
    orderIndex: number;
    priceMarkupCZK: number;
    requiredSubModifier: boolean;
    submodifiers: TSubmodifier[];
    title: string;
  }

  interface TProduct {
    allergens: string;
    composition: string;
    freeCutleryCount: number;
    id: number;
    image: string;
    isAvailable: boolean;
    isMultipleModifiers: null | true;
    modifiers: TModifier[];
    modifiersTitle: string;
    priceCZK: number;
    quantity: number;
    requiredModifier: boolean;
    shortDescription: null | string;
    slug: string;
    title: string;
    weight: string;
  }
}

export {};
