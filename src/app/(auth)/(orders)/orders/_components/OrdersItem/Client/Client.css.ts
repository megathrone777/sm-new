import { style } from "@/theme";

export const typeClass = style(({ colors }) => ({
  color: colors.blue,
  selectors: {
    "&.pickup": { color: colors.greenLighter },
  },
}));
