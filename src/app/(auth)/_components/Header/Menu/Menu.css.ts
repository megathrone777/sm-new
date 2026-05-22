import { css, cssVariant } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "center",
  columnGap: 30,
  display: "grid",
  gridAutoFlow: "column",

  "@media": {
    [devices.mobile]: {
      columnGap: 40,
    },
  },
}));

export const linkClass = cssVariant(
  ({ colors }) => ({
    active: {
      color: colors.red,
    },

    default: {
      color: "white",

      ":hover": {
        color: colors.red,
      },
    },
  }),

  (state, { devices, easing, fonts }) => [
    {
      alignItems: "center",
      columnGap: 8,
      display: "inline-grid",
      fontSize: 15,
      fontWeight: fonts.medium,
      gridAutoFlow: "column",
      overflow: "hidden",
      textIndent: -9999,
      transition: `color .25s ${easing}`,

      "@media": {
        [devices.mobile]: {
          textIndent: "unset",
        },
      },
    },
    state,
  ],
);

export const iconClass = css({
  height: 18,
});
