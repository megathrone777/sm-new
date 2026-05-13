import moment from "moment-timezone";

const SCHEDULE: Record<number, [number, number] | null> = {
  0: [11 * 60, 22 * 60],
  1: [11 * 60, 22 * 60],
  2: [11 * 60, 22 * 60],
  3: [11 * 60, 22 * 60],
  4: [11 * 60, 22 * 60],
  5: null,
  6: null,
};

const isShopOpened = (): boolean => {
  const pragueNow = moment.tz("Europe/Prague");
  const hours = SCHEDULE[pragueNow.day()];

  if (!hours) return false;
  const minutes = pragueNow.hours() * 60 + pragueNow.minutes();

  return minutes >= hours[0] && minutes < hours[1];
};

export { isShopOpened };
