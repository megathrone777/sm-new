import { redis } from "./redis";

const CART_LAYOUT_KEY = "cart:layout";
const CART_LAYOUT_MOBILE_KEY = "cart:layout:mobile";
const COLS = 2;

type TCartLayoutItem = {
  h: number;
  i: string;
  w: number;
  x: number;
  y: number;
};

const BLOCKS = ["delivery", "cutlery", "additionals", "note", "promo", "payment"] as const;

const DEFAULT_LAYOUT: TCartLayoutItem[] = [
  { h: 5, i: "delivery", w: 1, x: 0, y: 0 },
  { h: 1, i: "cutlery", w: 1, x: 1, y: 0 },
  { h: 1, i: "additionals", w: 1, x: 1, y: 1 },
  { h: 1, i: "note", w: 1, x: 1, y: 2 },
  { h: 1, i: "promo", w: 1, x: 1, y: 3 },
  { h: 1, i: "payment", w: 1, x: 1, y: 4 },
];

const DEFAULT_MOBILE_LAYOUT: TCartLayoutItem[] = [
  { h: 1, i: "delivery", w: 1, x: 0, y: 0 },
  { h: 1, i: "cutlery", w: 1, x: 0, y: 1 },
  { h: 1, i: "additionals", w: 1, x: 0, y: 2 },
  { h: 1, i: "note", w: 1, x: 0, y: 3 },
  { h: 1, i: "promo", w: 1, x: 0, y: 4 },
  { h: 1, i: "payment", w: 1, x: 0, y: 5 },
];

const computeGridTemplateAreas = (layout: TCartLayoutItem[], cols = COLS): string => {
  const maxRow = Math.max(...layout.map((item) => item.y + item.h));
  const grid: string[][] = Array.from({ length: maxRow }, () => Array<string>(cols).fill("."));

  for (const item of layout) {
    for (let r = item.y; r < item.y + item.h; r++) {
      for (let c = item.x; c < item.x + item.w; c++) {
        if (r < maxRow && c < cols) {
          grid[r]![c] = item.i;
        }
      }
    }
  }

  return grid.map((row) => `"${row.join(" ")}"`).join(" ");
};

const computeMobileOrder = (layout: TCartLayoutItem[]): Record<string, number> =>
  [...layout]
    .sort((first, second) => first.y - second.y)
    .reduce<Record<string, number>>((order, item, index) => {
      order[item.i] = index;

      return order;
    }, {});

const readLayout = async (
  key: string,
  defaultLayout: TCartLayoutItem[],
): Promise<TCartLayoutItem[]> => {
  const data = await redis.hgetall<Record<string, Partial<TCartLayoutItem>>>(key);

  if (!data || !Object.keys(data).length) return defaultLayout;

  return defaultLayout.map((item) => {
    const stored = data[item.i];

    if (!stored) return item;

    return { ...item, ...stored };
  });
};

const writeLayout = async (key: string, layout: TCartLayoutItem[]): Promise<void> => {
  const hash: Record<string, string> = {};

  for (const item of layout) {
    if ((BLOCKS as readonly string[]).includes(item.i)) {
      hash[item.i] = JSON.stringify({ h: item.h, w: item.w, x: item.x, y: item.y });
    }
  }

  await redis.hset(key, hash);
};

const cartLayout = {
  get: (): Promise<TCartLayoutItem[]> => readLayout(CART_LAYOUT_KEY, DEFAULT_LAYOUT),

  getMobile: (): Promise<TCartLayoutItem[]> =>
    readLayout(CART_LAYOUT_MOBILE_KEY, DEFAULT_MOBILE_LAYOUT),

  set: (layout: TCartLayoutItem[]): Promise<void> => writeLayout(CART_LAYOUT_KEY, layout),

  setMobile: (layout: TCartLayoutItem[]): Promise<void> =>
    writeLayout(CART_LAYOUT_MOBILE_KEY, layout),
};

export {
  cartLayout,
  computeGridTemplateAreas,
  computeMobileOrder,
  DEFAULT_LAYOUT,
  DEFAULT_MOBILE_LAYOUT,
};
export type { TCartLayoutItem };
