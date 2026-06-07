import { style } from "@/theme";

export const typeClass = style(({ colors }) => ({
  color: colors.greenLighter,
  selectors: {
    "&.cash": { color: colors.blue },
  },
}));
