declare global {
  interface TDeliveryCondition {
    distanceFrom: number;
    distanceTo: number;
    id: number;
    minimumOrderPrice: number;
    price: number;
    text: string;
    title: string;
  }

  interface TNavItem {
    href: string;
    title: string;
  }

  interface TContactLink {
    link: string;
    type: string;
  }

  interface TPromoCode {
    activatedAt: null | string;
    appliedCount: null | number;
    code: string;
    discount: number;
    id: number;
    isActive: boolean;
    isLimitedBySchedule: boolean;
    orderIds: TOrder["id"][];
    type: "oneTime" | "reusable";
    usability: "permanent" | "temporary" | null;
  }

  interface TShopSettings {
    address: string;
    businessName: string;
    companyDetails: string;
    contactItems: TContactLink[];
    cutleryPrice: number;
    deliveryTimeOptions: string[];
    email: string;
    isAvailable: boolean;
    isOpened: boolean;
    lastTimeVicinityHidden: string;
    logoUrl: string;
    navigation: TNavItem[];
    phone: string;
    privacyPolicy: string;
    termsOfUse: string;
    text: string;
    title: string;
  }

  interface TFeedback {
    bgImage: string;
    buttonSendTitle: string;
    title: string;
  }

  interface TReview {
    id: number;
    imageUrl: string;
  }
}

export {};
