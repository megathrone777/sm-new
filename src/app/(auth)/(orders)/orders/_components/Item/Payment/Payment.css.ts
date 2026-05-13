import { css } from "@/theme";

export const typeClass = css(({ colors }) => ({
  color: colors.greenLighter,
  selectors: {
    "&.cash": { color: "#3b82f6" },
  },
}));
