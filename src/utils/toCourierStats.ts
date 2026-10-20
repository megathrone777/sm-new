const toNumber = (value: unknown): number => {
  const parsed = +`${value}`;

  return Number.isFinite(parsed) ? parsed : 0;
};

const toCourierStats = (raw: null | Record<string, unknown>): null | TCourierStats => {
  if (!raw || Object.keys(raw).length === 0) return null;

  return {
    distance: toNumber(raw.distance),
    firstAt: toNumber(raw.firstAt),
    lastAt: toNumber(raw.lastAt),
    maxSpeed: toNumber(raw.maxSpeed),
    points: toNumber(raw.points),
  };
};

export { toCourierStats };
