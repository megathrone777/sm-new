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

  const pragueDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Prague" }));
  const day = DAY_LOOKUP[pragueDate.getDay()];

  if (!day) return false;

  const daySchedule = schedule[day];
  const minutes = pragueDate.getHours() * 60 + pragueDate.getMinutes();

  return (
    minutes >= parseMinutes(daySchedule.openTime) && minutes < parseMinutes(daySchedule.closeTime)
  );
};

export { isShopOpened };
