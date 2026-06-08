declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANTHROPIC_API_KEY: string;

      BLOB_READ_WRITE_TOKEN: string;

      EMAIL_ADDRESS: string;

      EMAIL_APP_PASSWORD: string;
      EMAIL_ORDER_CONFIRMATION_ENABLED: string;
      MAPY_CZ_API_KEY: string;

      OPENROUTER_API_KEY: string;

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
