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
    href: __next_route_internal_types__.RouteImpl<string>;
    title: string;
  }

  interface TContactLink {
    link: string;
    type: "instagram" | "phone" | "telegram" | "viber" | "whatsapp";
  }

  interface TPromoCode {
    activatedAt: string;
    appliedCount: number;
    code: string;
    discount: number;
    id: number;
    isActive: boolean;
    isLimitedBySchedule: boolean;
    orderIds: TOrder["id"][];
    type: "oneTime" | "reusable";
    usability: "" | "permanent" | "temporary";
  }

  interface TShopSettings {
    address: string;
    allergeny: string;
    allergenyUrl: string;
    businessName: string;
    companyDetails: string;
    contactItems: TContactLink[];
    cutleryPrice: number;
    deliveryConditions: TDeliveryCondition[];
    deliveryTimeOptions: string[];
    email: string;
    isAvailable: boolean;
    isOpened: boolean;
    lastTimeForPickup: string;
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
