const toKey = (str: string): string =>
  str
    .split("")
    .reduce<number>((h, c) => (Math.imul(31, h) + c.charCodeAt(0)) | 0, 0)
    .toString(36);

export { toKey };
