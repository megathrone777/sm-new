import { redis } from "./redis";

const CART_LAYOUT_KEY = "cart:layout";
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

const cartLayout = {
  get: async (): Promise<TCartLayoutItem[]> => {
    const data = await redis.hgetall<Record<string, Partial<TCartLayoutItem>>>(CART_LAYOUT_KEY);

    if (!data || !Object.keys(data).length) return DEFAULT_LAYOUT;

    return DEFAULT_LAYOUT.map((item) => {
      const stored = data[item.i];

      if (!stored) return item;

      return { ...item, ...stored };
    });
  },

  set: async (layout: TCartLayoutItem[]): Promise<void> => {
    const hash: Record<string, string> = {};

    for (const item of layout) {
      if ((BLOCKS as readonly string[]).includes(item.i)) {
        hash[item.i] = JSON.stringify({ h: item.h, w: item.w, x: item.x, y: item.y });
      }
    }

    await redis.hset(CART_LAYOUT_KEY, hash);
  },
};

export { cartLayout, computeGridTemplateAreas, DEFAULT_LAYOUT };
export type { TCartLayoutItem };
