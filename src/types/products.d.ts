declare global {
  interface TAdditional {
    id: number;
    price: number;
    sortOrder: number;
    title: string;
  }

  interface TSubmodifier {
    id: number;
    sortOrder: number;
    title: string;
  }

  interface TModifier {
    id: number;
    price: number;
    requiredSubModifier: boolean;
    sortOrder: number;
    subModifiers?: TSubmodifier[];
    title: string;
  }

  interface TProductCategory {
    fbCategoryId?: null | string;
    googleCategoryId?: null | string;
    id: number;
    imageUrl: string;
    isPromotionActive: boolean;
    modifiersTitle?: null | string;
    products: TProduct[];
    promotionDiscountAmount: number;
    promotionForEveryXProducts: number;
    sortOrder: number;
    title: string;
  }

  interface TProduct extends Pick<
    TProductCategory,
    "isPromotionActive" | "promotionDiscountAmount" | "promotionForEveryXProducts"
  > {
    allergens: null | string;
    categoryId: TProductCategory["id"];
    composition: string;
    description: null | string;
    fbCategoryId?: null | string;
    fbDescription: null | string;
    fbUpload: boolean;
    freeCutleryCount: number;
    googleCategoryId?: null | string;
    id: number;
    imageUrl: string;
    isAvailable: boolean;
    isMultipleModifiers: boolean | null;
    isTopProduct: boolean;
    modifiers: TModifier[];
    modifiersTitle: null | string;
    price: number;
    promotionDiscountAmount: number;
    promotionForEveryXProducts: number;
    requiredCutlery: boolean;
    requiredModifier: boolean;
    slug: string;
    sortOrder: number;
    title: string;
    weight: string;
  }
}

export {};
