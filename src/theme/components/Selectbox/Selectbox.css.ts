import { css } from "@/theme";

export const wrapperClass = css({
  display: "grid",
  gridAutoFlow: "row",
  position: "relative",
  rowGap: 4,
});

export const layoutClass = css(({ colors, fonts }) => ({
  ".rc-select-content": {
    display: "grid",
    gap: "4px",
    gridAutoFlow: "row",
    justifyContent: "start",
    lineHeight: "26px",
    minHeight: "34px",
    paddingInline: "4px",
    paddingTop: "4px",
  },

  ".rc-select-input": {
    background: "transparent",
    border: "none",
    borderColor: colors.red,
    borderRadius: "8px",
    cursor: "pointer",
    inset: 0,
    margin: 0,
    minHeight: "34px",
    opacity: 0,
    outline: "none",
    paddingBlock: 0,
    paddingInline: "4px",
    position: "absolute",

    ":focus": {
      borderColor: colors.red,
      outline: "none",
    },
  },

  alignItems: "end",
  backgroundColor: "white",
  borderBottom: `2px solid ${colors.red}`,
  color: "black",
  display: "grid",
  fontFamily: "inherit",
  fontSize: "16px",
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  height: "100%",
  minHeight: "34px",
  position: "relative",
  width: "100%",
  zIndex: 11,
}));

export const labelClass = css(({ fonts }) => ({
  cursor: "pointer",
  fontWeight: fonts.bold,
  justifySelf: "start",
  lineHeight: "normal",
  userSelect: "none",
}));

export const optionClass = css({
  paddingBlock: 0,
  paddingRight: 8,
});

export const tagClass = css(({ fonts }) => ({
  alignItems: "center",
  backgroundColor: "rgb(214, 216, 215)",
  borderRadius: 10,
  columnGap: 8,
  display: "inline-grid",
  fontSize: 14,
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  paddingBlock: 0,
  paddingInline: 6,
}));

export const closeButtonClass = css({
  alignItems: "center",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  display: "grid",
  height: 18,
  justifyContent: "center",
  margin: 0,
  padding: 0,
  position: "relative",
  selectors: {
    "div.rc-select-content-item-rest &": {
      display: "none",
    },
  },
  width: 18,
  zIndex: 2,

  ":hover": {
    filter: "brightness(200%)",
  },
});

export const iconClass = css(({ colors }) => ({
  color: colors.red,
  height: 15,
  width: 15,
}));

export const suffixClass = css(({ colors, easing }) => ({
  color: colors.red,
  cursor: "pointer",
  height: 21,
  position: "absolute",
  right: 8,
  selectors: {
    ".rc-select-open &": {
      rotate: "180deg",
    },
  },
  top: "50%",
  transform: "translateY(-50%)",
  transformOrigin: "center top",
  transition: `rotate .2s ${easing}`,
  width: 21,
}));

export const searchWrapperClass = css(({ colors }) => ({
  borderBottom: `2px solid ${colors.red}`,
  height: 35,
}));

export const searchInputClass = css(({ fonts }) => ({
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

export const popupClass = css(({ animations, colors, easing, fonts }) => ({
  ".rc-select-item-empty": {
    fontSize: "15px",
    fontWeight: fonts.medium,
    lineHeight: "38px",
    minHeight: "38px",
    textAlign: "center",
  },

  ".rc-select-item-option": {
    alignItems: "center",
    cursor: "pointer",
    display: "grid",
    fontSize: "15px",
    fontWeight: fonts.medium,
    gridAutoFlow: "column",
    justifySelf: "start",
    lineHeight: "38px",
    minHeight: "38px",
    overflow: "hidden",
    paddingBlock: 0,
    position: "relative",
    userSelect: "none",
    whiteSpace: "nowrap",
    width: "100%",

    "&.rc-select-item-option-selected": {
      backgroundColor: "rgba(0, 0, 0, .1)",
    },

    ":hover": {
      backgroundColor: "rgba(0, 0, 0, .1)",
    },
  },

  ".rc-select-item-option-content": {
    paddingLeft: "8px",

    ":hover": {
      backgroundColor: "transparent",
    },
  },

  ".rc-select-item-option .rc-select-item-option-state": {
    alignItems: "center",
    display: "grid",
    justifyContent: "center",
    pointerEvents: "none",
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
  },

  ".rc-select-selection-item-remove": {
    cursor: "pointer",
    height: "18px",
    width: "18px",
  },

  ".rc-virtual-list-holder": {
    overflowY: "scroll",
  },

  animationDuration: "300ms",
  animationFillMode: "forwards",
  animationIterationCount: 1,
  animationName: animations.fadeInDown,
  animationTimingFunction: easing,
  backgroundColor: "white",
  border: `2px solid ${colors.red}`,
  borderBottomLeftRadius: "6px",
  borderBottomRightRadius: "6px",
  overflow: "hidden",
  position: "absolute",
  zIndex: 10,

  "&.rc-select-dropdown-hidden": {
    animation: "unset",
    opacity: 0,
    transform: "translate3d(0, -4px, 0)",
  },
}));
