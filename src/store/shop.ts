import { redis } from "./redis";

const NAV_TITLES_KEY = "nav:titles";
const IMAGE_URLS_KEY = "shop:imageUrls";
const SETTINGS_KEY = "shop:settings";
const SCHEDULE_KEY = "shop:schedule";

type TImageKey =
  | "additionalInfoBg"
  | "allergeny"
  | "heroMain"
  | "heroMainMobile"
  | "heroMainTablet"
  | "heroPages"
  | "logo"
  | "promotionBg"
  | "promotionCol1"
  | "promotionCol2"
  | "scheduleImage";

const VALID_IMAGE_KEYS: TImageKey[] = [
  "additionalInfoBg",
  "allergeny",
  "heroMain",
  "heroMainMobile",
  "heroMainTablet",
  "heroPages",
  "logo",
  "promotionBg",
  "promotionCol1",
  "promotionCol2",
  "scheduleImage",
];

const WEEK_DAYS: TWeekDay[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

type TEditableSettings = Pick<
  TShopSettings,
  | "address"
  | "businessName"
  | "closedByOverloadText"
  | "closedByOverloadTitle"
  | "closedByScheduleText"
  | "closedByScheduleTitle"
  | "companyDetails"
  | "cutleryPrice"
  | "email"
  | "isAvailable"
  | "lastTimeForPickup"
  | "mapUrl"
  | "phone"
  | "title"
>;

const DEFAULT_SETTINGS: TEditableSettings = {
  address: "Milíčova 471/25",
  businessName: "MSN form s.r.o., IČ: 099 07 017",
  closedByOverloadText:
    "Vážení zákazníci, dnes máme zavřeno z důvodu konání soukromé party.\nBudeme se na vás těšit v následující pracovní den!",
  closedByOverloadTitle: "Teď objednat není možné.",
  closedByScheduleText:
    "Rozvoz: Pn. - Čt., Ne. 11:00-22:00<br />\nNoční rozvoz: Pá. - So. 11:00-22:30<br />\nRestaurace: Pn. - Ne. 17:00-22:00",
  closedByScheduleTitle: "Teď máme zavřeno.",
  companyDetails: "MSN form s.r.o.\nIČ: 099 07 017\nDIČ: CZ 099 07 017",
  cutleryPrice: 10,
  email: "sushimanprague@gmail.com",
  isAvailable: true,
  lastTimeForPickup: "21:00",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.0065837985594!2d14.451856!3d50.0861636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b949f356db7df%3A0x70e7336f5adef924!2zTWlsw63EjW92YSA0NzEvMjUsIDEzMCAwMCBQcmFoYSAzLcW9acW-a292!5e0!3m2!1sru!2scz!4v1678839079128!5m2!1sru!2scz",
  phone: "+420 792 745 116",
  title: "Rozvážíme",
};

const DEFAULT_NAV: TNavItem[] = [
  { href: "/#about-section", title: "O nas" },
  { href: "/menu", title: "Menu" },
  { href: "/#delivery-section", title: "Doprava a platba" },
  { href: "/#reviews-section", title: "Recenze" },
  { href: "/contacts", title: "Kontakty" },
];

const DEFAULT_IMAGE_URLS: Record<TImageKey, string> = {
  additionalInfoBg: "",
  allergeny: "",
  heroMain: "",
  heroMainMobile: "",
  heroMainTablet: "",
  heroPages: "",
  logo: "",
  promotionBg: "",
  promotionCol1: "",
  promotionCol2: "",
  scheduleImage: "",
};

const DEFAULT_SCHEDULE_DAY: TScheduleDay = {
  closeTime: "22:00",
  lastTimeForDelivery: "21:00",
  openTime: "11:00",
};

const DEFAULT_SCHEDULE: TSchedule = WEEK_DAYS.reduce<TSchedule>(
  (accumulator: TSchedule, day: TWeekDay): TSchedule => ({
    ...accumulator,
    [day]: DEFAULT_SCHEDULE_DAY,
  }),
  {} as TSchedule,
);

export const parseSettingsOverrides = (
  raw: null | Record<string, unknown>,
): Partial<TEditableSettings> => {
  if (!raw) return {};
  const result: Partial<TEditableSettings> = {};

  for (const key of Object.keys(raw) as (keyof TEditableSettings)[]) {
    const value = raw[key];

    if (value === undefined || value === null) continue;

    if (key === "cutleryPrice") {
      result.cutleryPrice = +`${value}`;
    } else if (key === "isAvailable") {
      result.isAvailable = value === true || value === "true" || value === "1" || value === 1;
    } else {
      (result as Record<string, string>)[key] = `${value}`;
    }
  }

  return result;
};

export const parseScheduleDay = (raw: unknown): TScheduleDay => {
  if (!raw || typeof raw !== "object") return DEFAULT_SCHEDULE_DAY;
  const day = raw as Partial<TScheduleDay>;

  return {
    closeTime: day.closeTime ?? DEFAULT_SCHEDULE_DAY.closeTime,
    lastTimeForDelivery: day.lastTimeForDelivery ?? DEFAULT_SCHEDULE_DAY.lastTimeForDelivery,
    openTime: day.openTime ?? DEFAULT_SCHEDULE_DAY.openTime,
  };
};

export const parseSchedule = (raw: null | Record<string, unknown>): TSchedule => {
  if (!raw) return DEFAULT_SCHEDULE;

  return WEEK_DAYS.reduce<TSchedule>(
    (accumulator: TSchedule, day: TWeekDay): TSchedule => ({
      ...accumulator,
      [day]: raw[day] ? parseScheduleDay(raw[day]) : DEFAULT_SCHEDULE_DAY,
    }),
    {} as TSchedule,
  );
};

const shop = {
  getSettings: async (): Promise<TShopSettings> => {
    const [navOverrides, imageOverrides, settingsOverrides, scheduleRaw] = await Promise.all([
      redis.hgetall<Record<string, string>>(NAV_TITLES_KEY),
      redis.hgetall<Record<TImageKey, string>>(IMAGE_URLS_KEY),
      redis.hgetall<Record<string, unknown>>(SETTINGS_KEY),
      redis.hgetall<Record<string, unknown>>(SCHEDULE_KEY),
    ]);
    const navigation: TNavItem[] = DEFAULT_NAV.map(
      (item: TNavItem): TNavItem => ({
        href: item.href,
        title: navOverrides?.[item.href] ?? item.title,
      }),
    );
    const settings: TEditableSettings = {
      ...DEFAULT_SETTINGS,
      ...parseSettingsOverrides(settingsOverrides),
    };

    return {
      ...settings,
      additionalInfoBgUrl: imageOverrides?.additionalInfoBg ?? DEFAULT_IMAGE_URLS.additionalInfoBg,
      allergenyUrl: imageOverrides?.allergeny ?? DEFAULT_IMAGE_URLS.allergeny,
      contactItems: [
        { link: "https://instagram.com/sushiman_prague", type: "instagram" },
        { link: "http://t.me/sushimanprague", type: "telegram" },
        {
          link: "https://wa.me/420792745116?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5.%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7!",
          type: "whatsapp",
        },
        { link: "viber://chat?number=%2B420792745116#/", type: "viber" },
        { link: "tel:+420792745116", type: "phone" },
      ],
      heroMainMobileUrl: imageOverrides?.heroMainMobile ?? DEFAULT_IMAGE_URLS.heroMainMobile,
      heroMainTabletUrl: imageOverrides?.heroMainTablet ?? DEFAULT_IMAGE_URLS.heroMainTablet,
      heroMainUrl: imageOverrides?.heroMain ?? DEFAULT_IMAGE_URLS.heroMain,
      heroPagesUrl: imageOverrides?.heroPages ?? DEFAULT_IMAGE_URLS.heroPages,
      logoUrl: imageOverrides?.logo ?? DEFAULT_IMAGE_URLS.logo,
      navigation,
      promotionBgUrl: imageOverrides?.promotionBg ?? DEFAULT_IMAGE_URLS.promotionBg,
      promotionCol1Url: imageOverrides?.promotionCol1 ?? DEFAULT_IMAGE_URLS.promotionCol1,
      promotionCol2Url: imageOverrides?.promotionCol2 ?? DEFAULT_IMAGE_URLS.promotionCol2,
      schedule: parseSchedule(scheduleRaw),
      scheduleImageUrl: imageOverrides?.scheduleImage ?? DEFAULT_IMAGE_URLS.scheduleImage,
    };
  },

  setImageUrl: async (key: TImageKey, url: string): Promise<void> => {
    await redis.hset(IMAGE_URLS_KEY, { [key]: url });
  },

  setNavTitle: async (href: string, title: string): Promise<void> => {
    await redis.hset(NAV_TITLES_KEY, { [href]: title });
  },

  setScheduleDay: async (day: TWeekDay, schedule: TScheduleDay): Promise<void> => {
    await redis.hset(SCHEDULE_KEY, { [day]: schedule });
  },

  setSettings: async (patch: Partial<TEditableSettings>): Promise<void> => {
    const stringified: Record<string, string> = {};

    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined) continue;
      stringified[key] = `${value}`;
    }

    if (!Object.keys(stringified).length) return;
    await redis.hset(SETTINGS_KEY, stringified);
  },
};

export { shop, VALID_IMAGE_KEYS, WEEK_DAYS };
export type { TImageKey };
