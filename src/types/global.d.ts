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
      API_TOKEN: string;
      API_URL: string;
      APP_URL: string;
      MAPY_CZ_API_KEY: string;
      REDIS_URL: string;
    }
  }
}

export {};
