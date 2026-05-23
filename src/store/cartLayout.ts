import { redis } from "./redis";

import type { Layout, LayoutItem } from "react-grid-layout";

const CART_LAYOUT_KEY = "cart:layout";
const CART_LAYOUT_MOBILE_KEY = "cart:layout:mobile";

const gridAreas = ["delivery", "cutlery", "additionals", "note", "promo", "payment"];

const desktopLayout: Layout = [
  { h: 5, i: "delivery", minW: 1, w: 1, x: 0, y: 0 },
  { h: 1, i: "cutlery", minW: 1, w: 1, x: 1, y: 0 },
  { h: 1, i: "additionals", minW: 1, w: 1, x: 1, y: 1 },
  { h: 1, i: "note", minW: 1, w: 1, x: 1, y: 2 },
  { h: 1, i: "promo", minW: 1, w: 1, x: 1, y: 3 },
  { h: 1, i: "payment", minW: 1, w: 1, x: 1, y: 4 },
];

const mobileLayout: Layout = [
  { h: 1, i: "delivery", minW: 1, w: 1, x: 0, y: 0 },
  { h: 1, i: "cutlery", minW: 1, w: 1, x: 0, y: 1 },
  { h: 1, i: "additionals", minW: 1, w: 1, x: 0, y: 2 },
  { h: 1, i: "note", minW: 1, w: 1, x: 0, y: 3 },
  { h: 1, i: "promo", minW: 1, w: 1, x: 0, y: 4 },
  { h: 1, i: "payment", minW: 1, w: 1, x: 0, y: 5 },
];

const calculateGridAreas = (layout: Layout, cols = 2): string => {
  const maxRow = Math.max(...layout.map<number>(({ h, y }: LayoutItem) => y + h));
  const grid: string[][] = Array.from({ length: maxRow }, () => Array<string>(cols).fill("."));

  for (const { h, i, w, x, y } of layout) {
    for (let r = y; r < y + h; r++) {
      for (let c = x; c < x + w; c++) {
        if (r < maxRow && c < cols) {
          grid[r]![c] = i;
        }
      }
    }
  }

  return grid.map((row) => `"${row.join(" ")}"`).join(" ");
};

const calculateMobileOrder = (layout: Layout): Record<string, number> =>
  [...layout]
    .sort((first, second) => first.y - second.y)
    .reduce<Record<string, number>>((order, { i }, index: number) => {
      order[i] = index;

      return order;
    }, {});

const readLayout = async (key: string, defaultLayout: Layout): Promise<Layout> => {
  const data = await redis.hgetall<Record<string, Partial<LayoutItem>>>(key);

  if (!data || !Object.keys(data).length) return defaultLayout;

  return defaultLayout.map((layoutItem: LayoutItem) => {
    const stored = data[layoutItem.i];

    if (!stored) return layoutItem;

    return { ...layoutItem, ...stored };
  });
};

const writeLayout = async (key: string, layout: Layout): Promise<void> => {
  const hash: Record<string, string> = {};

  for (const { h, i, w, x, y } of layout) {
    if (gridAreas.includes(i)) {
      hash[i] = JSON.stringify({ h, w, x, y });
    }
  }

  await redis.hset(key, hash);
};

const cartLayout = {
  calculateGridAreas,
  calculateMobileOrder,
  desktopLayout,
  get: (): Promise<Layout> => readLayout(CART_LAYOUT_KEY, desktopLayout),
  getMobile: (): Promise<Layout> => readLayout(CART_LAYOUT_MOBILE_KEY, mobileLayout),
  mobileLayout,
  set: (layout: Layout): Promise<void> => writeLayout(CART_LAYOUT_KEY, layout),
  setMobile: (layout: Layout): Promise<void> => writeLayout(CART_LAYOUT_MOBILE_KEY, layout),
};

export { calculateGridAreas, calculateMobileOrder, cartLayout };
