import { redis } from "./redis";

const HERO_KEY = "shop:hero";

const DEFAULT_HERO: THero = {
  buttonLink: "/menu",
  buttonTitle: "Objednat",
  description:
    "Exkluzivní pokrmy a servis, příjemné prostředí, chill zone a spoustu koktejlů!\nRezervujte si stůl už teď.<br><br>Na Rozvoz pracujeme od 11:00.<br>\nRestaurace otevírá od 17:00.",
  title: "NOVINKA od Sushi Man! Udon a Sushi Burger!",
};

const hero = {
  get: async (): Promise<THero> => {
    const raw = await redis.hgetall<Partial<THero>>(HERO_KEY);

    if (!raw) return DEFAULT_HERO;

    return {
      buttonLink: raw.buttonLink ?? DEFAULT_HERO.buttonLink,
      buttonTitle: raw.buttonTitle ?? DEFAULT_HERO.buttonTitle,
      description: raw.description ?? DEFAULT_HERO.description,
      title: raw.title ?? DEFAULT_HERO.title,
    };
  },

  set: async (patch: Partial<THero>): Promise<void> => {
    const stringified: Record<string, string> = {};

    for (const [key, value] of Object.entries(patch)) {
      if (value !== undefined) stringified[key] = `${value}`;
    }

    if (!Object.keys(stringified).length) return;
    await redis.hset(HERO_KEY, stringified);
  },
};

export { hero };
