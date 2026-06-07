import { rgba, style, styleVariants } from "@/theme";

export const wrapperClass = style({
  alignItems: "center",
  display: "grid",
  height: "100%",
  justifyContent: "center",
  width: 30,
});

export const popupClass = styleVariants(
  {
    closed: {
      opacity: 0,
      pointerEvents: "none",
      transform: "translate3d(0, -2px, 0)",
    },

    opened: {
      opacity: 1,
      pointerEvents: "auto",
      transform: "translate3d(0, 2px, 0)",
    },
  },

  (variant, { colors, easing }) => [
    {
      backgroundColor: "white",
      border: `2px solid ${colors.red}`,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
      borderTop: 0,
      display: "grid",
      gridAutoFlow: "row",
      insetInline: 0,
      maxHeight: 200,
      overflow: "hidden",
      position: "absolute",
      top: "100%",
      transitionDuration: "300ms",
      transitionProperty: "opacity, transform",
      transitionTimingFunction: easing,
      width: "100%",
      zIndex: 10,
    },
    variant,
  ],
);

export const listClass = style({
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  maxHeight: 200,
  overflowY: "auto",
});

export const optionClass = style(({ colors, fonts }) => ({
  alignItems: "center",
  background: "none",
  border: "none",
  columnGap: 8,
  display: "grid",
  fontFamily: "inherit",
  fontSize: 15,
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  justifyContent: "start",
  minHeight: 36,
  paddingInline: 8,
  width: "100%",

  ":focus": {
    outline: "none",
  },

  ":hover": {
    backgroundColor: rgba(colors.black, 0.1),
  },
}));

export const optionImageClass = style({
  height: 14,
  width: 20,
});

export const optionCodeClass = style(({ colors }) => ({
  color: colors.gray,
}));

export const triggerClass = style({
  alignItems: "center",
  background: "none",
  border: "none",
  display: "grid",
  justifyContent: "center",
  width: 30,

  ":focus": {
    outline: "none",
  },
});

export const imageClass = style({
  display: "block",
  width: 21,
});

export const searchWrapperClass = style(({ colors }) => ({
  borderBottom: `2px solid ${colors.red}`,
  height: 35,
}));

export const searchInputClass = style(({ fonts }) => ({
  background: "none",
  border: "none",
  borderRadius: 4,
  fontFamily: "inherit",
  fontSize: 16,
  fontWeight: fonts.medium,
  height: 35,
  outline: "none",
  paddingBlock: 0,
  paddingInline: 8,
  width: "100%",

  ":focus": {
    outline: "none",
  },
}));
