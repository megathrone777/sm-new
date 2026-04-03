import { css, cssVariants } from "@/theme";

export const wrapperClass = cssVariants(
  {
    normal: {
      paddingLeft: 35,
    },
    small: {
      paddingLeft: 30,
    },
  },
  (template) => [{}, template],
);

export const labelClass = css(({ fonts }) => ({
  cursor: "pointer",
  fontWeight: fonts.medium,
  userSelect: "none",
}));
