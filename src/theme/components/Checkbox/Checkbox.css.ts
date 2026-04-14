import { css, cssVariants } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "start",
  columnGap: 7,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",

  "@media": {
    [devices.mobileXs]: {
      columnGap: 10,
    },
  },
}));

export const layoutClass = cssVariants(
  {
    normal: {
      height: 25,
      minWidth: 25,
      width: 25,
    },
    small: {
      height: 21,
      minWidth: 21,
      width: 21,
    },
  },
  (template, { colors }) => [
    {
      alignContent: "center",
      alignItems: "center",
      border: `2px solid ${colors.red}`,
      borderRadius: "50%",
      color: colors.red,
      display: "grid",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
    },
    template,
  ],
);

export const inputClass = css({
  cursor: "pointer",
  display: "block",
  height: "100%",
  inset: 0,
  opacity: 0,
  overflow: "hidden",
  position: "absolute",
  width: "100%",
  zIndex: 2,
});

export const iconClass = cssVariants(
  {
    normal: {
      height: 14,
    },
    small: {
      height: 11,
    },
  },
  (template) => [
    {
      display: "none",
      insetInline: 0,
      marginInline: "auto",
      pointerEvents: "none",
      position: "absolute",
      selectors: {
        [`${inputClass}:checked + &`]: {
          display: "block",
        },
      },
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
    },
    template,
  ],
);

export const labelClass = cssVariants(
  {
    normal: {
      lineHeight: "25px",
    },
    small: {
      lineHeight: "21px",
    },
  },
  (template, { fonts }) => [
    {
      cursor: "pointer",
      fontWeight: fonts.medium,
      userSelect: "none",
    },
    template,
  ],
);

export const hintClass = css(({ colors, fonts }) => ({
  color: colors.red,
  display: "inline-block",
  fontWeight: fonts.bold,
  paddingLeft: 3,
}));
