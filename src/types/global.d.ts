declare global {
  interface TContactLink {
    link: string;
    type: string;
  }

  interface TDeliveryCondition {
    distanceFrom: number;
    distanceTo: number;
    id: number;
    minimumOrderPrice: number;
    price: number;
    text: string;
    title: string;
  }

  interface TGeneralInfo {
    address: string;
    businessName: string;
    companyDetails: string;
    contactItems: TContactLink[];
    email: string;
    logo: string;
    phone: string;
    privacyPolicy: string;
    termsOfUse: string;
  }

  interface TSelectOption {
    label: string;
    value: null | string;
  }

  interface TFacebookEvent {
    content_ids?: (number | string)[];
    content_type?: string;
    currency?: string;
    quantity?: number;
    value?: number | string;
  }

  interface TPricingSetting {
    cutleryPrice: number;
  }

  interface TSchedule {
    lastTimeVicinityHidden: string;
  }

  interface TShopSettings {
    deliveryTimeOptions: string[];
    isAvailable: boolean;
    isOpened: boolean;
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

  const fbq: (track: string, action: string, eventData: TFacebookEvent) => void;

  interface Window {
    fbq: typeof fbq;
  }

  namespace NodeJS {
    interface ProcessEnv {
      APP_KV_REST_API_READ_ONLY_TOKEN: string;
      APP_KV_REST_API_TOKEN: string;
      APP_KV_REST_API_URL: string;
      APP_REDIS_URL: string;
      APP_URL: string;
      MAPY_CZ_API_KEY: string;
    }
  }
}

export {};
