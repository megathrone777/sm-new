import { redis } from "./redis";

const ADDITIONAL_INFO_KEY = "shop:additionalInfo";

const DEFAULT_ADDITIONAL_INFO: TAdditionalInfo = {
  col1Text: "",
  col1Title: "",
  col2Text: "",
  col2Title: "",
  col3Text: "",
  col3Title: "",
  description: "",
  title: "",
};

const additionalInfo = {
  get: async (): Promise<TAdditionalInfo> => {
    const raw = await redis.hgetall<Record<string, string>>(ADDITIONAL_INFO_KEY);

    if (!raw) return DEFAULT_ADDITIONAL_INFO;

    return {
      col1Text: raw.col1Text ?? DEFAULT_ADDITIONAL_INFO.col1Text,
      col1Title: raw.col1Title ?? DEFAULT_ADDITIONAL_INFO.col1Title,
      col2Text: raw.col2Text ?? DEFAULT_ADDITIONAL_INFO.col2Text,
      col2Title: raw.col2Title ?? DEFAULT_ADDITIONAL_INFO.col2Title,
      col3Text: raw.col3Text ?? DEFAULT_ADDITIONAL_INFO.col3Text,
      col3Title: raw.col3Title ?? DEFAULT_ADDITIONAL_INFO.col3Title,
      description: raw.description ?? DEFAULT_ADDITIONAL_INFO.description,
      title: raw.title ?? DEFAULT_ADDITIONAL_INFO.title,
    };
  },

  set: async (patch: Partial<TAdditionalInfo>): Promise<void> => {
    const stringified: Record<string, string> = {};

    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined) continue;
      stringified[key] = `${value}`;
    }

    if (!Object.keys(stringified).length) return;
    await redis.hset(ADDITIONAL_INFO_KEY, stringified);
  },
};

export { additionalInfo };
