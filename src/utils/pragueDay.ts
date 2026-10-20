const formatter = new Intl.DateTimeFormat("en-CA", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "Europe/Prague",
  year: "numeric",
});

const pragueDay = (date: Date = new Date()): string => formatter.format(date);

export { pragueDay };
