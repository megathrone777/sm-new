declare global {
  type TUserRole = "admin" | "cook";

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
