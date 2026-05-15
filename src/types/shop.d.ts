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

  type TWeekDay =
    | "friday"
    | "monday"
    | "saturday"
    | "sunday"
    | "thursday"
    | "tuesday"
    | "wednesday";

  interface TScheduleDay {
    closeTime: string;
    lastTimeForDelivery: string;
    openTime: string;
  }

  type TSchedule = Record<TWeekDay, TScheduleDay>;

  interface TShopSettings {
    additionalInfoBgUrl: string;
    address: string;
    allergenyUrl: string;
    businessName: string;
    closedByOverloadText: string;
    closedByOverloadTitle: string;
    closedByScheduleText: string;
    closedByScheduleTitle: string;
    companyDetails: string;
    contactItems: TContactLink[];
    cutleryPrice: number;
    email: string;
    heroMainUrl: string;
    heroPagesUrl: string;
    isAvailable: boolean;
    lastTimeForPickup: string;
    logoUrl: string;
    navigation: TNavItem[];
    phone: string;
    promotionBgUrl: string;
    promotionCol1Url: string;
    promotionCol2Url: string;
    schedule: TSchedule;
    scheduleImageUrl: string;
    title: string;
  }

  interface THero {
    buttonLink: string;
    buttonTitle: string;
    description: string;
    title: string;
  }

  interface TAdditionalInfo {
    col1Text: string;
    col1Title: string;
    col2Text: string;
    col2Title: string;
    col3Text: string;
    col3Title: string;
    description: string;
    title: string;
  }

  interface TPromotion {
    col1Text: string;
    col2Text: string;
  }

  type TSmsTemplateKey =
    | "newOrderDelivery"
    | "newOrderDeliveryCustomDeliveryTime"
    | "newOrderPickup"
    | "newOrderPickupCustomDeliveryTime"
    | "orderIsOnTheWay"
    | "orderIsReadyToPickup";

  type TSmsTemplates = Record<TSmsTemplateKey, string>;

  interface TAbout {
    description: string;
    imageUrl: string;
    title: string;
  }

  interface TFeedback {
    bgImage: string;
    buttonSendTitle: string;
    title: string;
  }

  interface TReview {
    count: string;
    id: number;
    imageUrl: string;
    link: string;
    linkTitle: string;
    text: string;
  }
}

export {};
