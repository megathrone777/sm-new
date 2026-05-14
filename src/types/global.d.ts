declare global {
  interface TActionResult {
    message: string;
    type: "error" | "success";
  }

  type TUserRole = "admin" | "cook" | "waiter";

  interface TUser {
    id: string;
    login: string;
    passwordHash: string;
    role: TUserRole;
    salt: string;
  }

  interface TSessionData {
    role: TUserRole;
    userId: TUser["id"];
  }

  interface TSelectOption {
    label: string;
    value: null | string;
  }

  interface TFacebookData {
    content_ids?: (number | string)[];
    content_type?: string;
    currency?: string;
    quantity?: number;
    value?: number | string;
  }

  const fbq: (track: string, action: string, eventData: TFacebookData) => void;

  interface Window {
    fbq: typeof fbq;
  }

  namespace NodeJS {
    interface ProcessEnv {
      EMAIL_ADDRESS: string;
      EMAIL_APP_PASSWORD: string;
      EMAIL_ORDER_CONFIRMATION_ENABLED: string;

      MAPY_CZ_API_KEY: string;

      PUBLIC_URL: string;

      REDIS_API_TOKEN: string;
      REDIS_API_URL: string;

      SMS_BULKGATE_APPLICATION_ID: string;
      SMS_BULKGATE_APPLICATION_TOKEN: string;
      SMS_BULKGATE_IS_ENABLED: string;
      SMS_BULKGATE_SENDER_ID: string;
      SMS_BULKGATE_SENDER_ID_VALUE: string;
    }
  }
}

export {};
