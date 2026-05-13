import { css } from "@/theme";

export const typeClass = css(({ colors }) => ({
  color: "#3b82f6",

  selectors: {
    "&.pickup": { color: colors.greenLighter },
  },
}));
