import { redis } from "./redis";

const ABOUT_KEY = "shop:about";

const DEFAULT_ABOUT: TAbout = {
  description: "",
  imageUrl: "",
  title: "",
};

const parseAboutOverrides = (raw: null | Record<string, string>): Partial<TAbout> => {
  if (!raw) return {};

  return {
    description: raw.description ?? DEFAULT_ABOUT.description,
    imageUrl: raw.imageUrl ?? DEFAULT_ABOUT.imageUrl,
    title: raw.title ?? DEFAULT_ABOUT.title,
  };
};

const about = {
  get: async (): Promise<TAbout> => {
    const raw = await redis.hgetall<Record<string, string>>(ABOUT_KEY);

    return {
      ...DEFAULT_ABOUT,
      ...parseAboutOverrides(raw),
    };
  },

  set: async (patch: Partial<TAbout>): Promise<void> => {
    const stringified: Record<string, string> = {};

    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined) continue;
      stringified[key] = `${value}`;
    }

    if (!Object.keys(stringified).length) return;
    await redis.hset(ABOUT_KEY, stringified);
  },
};

export { about };