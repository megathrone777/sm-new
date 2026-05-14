import moment from "moment-timezone";

const DAY_LOOKUP: TWeekDay[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const parseMinutes = (value: string): number => {
  const [hours, minutes] = value.split(":").map(Number);

  return (hours ?? 0) * 60 + (minutes ?? 0);
};

const isShopOpened = (schedule: TSchedule, isAvailable: boolean): boolean => {
  if (!isAvailable) return false;

  const now = moment.tz("Europe/Prague");
  const day = DAY_LOOKUP[now.day()];

  if (!day) return false;

  const daySchedule = schedule[day];
  const minutes = now.hours() * 60 + now.minutes();

  return (
    minutes >= parseMinutes(daySchedule.openTime) && minutes < parseMinutes(daySchedule.closeTime)
  );
};

export { isShopOpened };
