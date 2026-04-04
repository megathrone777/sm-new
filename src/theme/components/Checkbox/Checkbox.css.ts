import { css, cssVariants } from "@/theme";

export const wrapperClass = css({
  alignItems: "start",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
});

export const layoutClass = cssVariants(
  {
    normal: {
      height: 25,
      minWidth: 25,
      width: 25,
    },
    small: {
      height: 20,
      minWidth: 20,
      width: 20,
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
      pointerEvents: "none",
      position: "relative",
      selectors: {
        [`${inputClass}:checked + &`]: {
          display: "block",
        },
      },
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
      lineHeight: "20px",
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
