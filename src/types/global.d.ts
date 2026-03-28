declare global {
  interface TContactLink {
    link: string;
    type: string;
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
    cutleryPriceCZK: number;
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
