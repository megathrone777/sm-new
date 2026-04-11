import { css } from "@/theme";

export const wrapperClass = css({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 4,
});

export const layoutClass = css(({ colors, fonts }) => ({
  ".rc-select-content": {
    display: "grid",
    gap: 4,
    gridAutoFlow: "row",
    justifyContent: "start",
    lineHeight: "26px",
    minHeight: 34,
    paddingInline: 4,
    paddingTop: 4,
  },

  ".rc-select-input": {
    background: "transparent",
    border: "none",
    borderColor: colors.red,
    borderRadius: 8,
    cursor: "pointer",
    inset: 0,
    margin: 0,
    minHeight: 34,
    opacity: 0,
    outline: "none",
    paddingBlock: 0,
    paddingInline: 4,
    position: "absolute",

    ":focus": {
      borderColor: colors.red,
      outline: "none",
    },
  },

  backgroundColor: "white",
  borderBottom: `2px solid ${colors.red}`,
  color: "black",
  display: "grid",
  fontFamily: "inherit",
  fontSize: 16,
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  height: "100%",
  minHeight: 34,
  position: "relative",
  width: "100%",
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
  height: 18,
  width: 18,
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
  padding: 6,
}));

export const searchInputClass = css(({ fonts }) => ({
  border: "none",
  borderRadius: 4,
  fontFamily: "inherit",
  fontSize: 16,
  fontWeight: fonts.medium,
  outline: "none",
  paddingBlock: 0,
  paddingInline: 8,
  width: "100%",

  ":focus": {
    outline: "none",
  },
}));

export const popupClass = css(({ colors, fonts }) => ({
  ".rc-select-item-empty": {
    fontSize: 15,
    fontWeight: fonts.medium,
    paddingBlock: 4,
    textAlign: "center",
  },

  ".rc-select-item-option": {
    alignItems: "center",
    cursor: "pointer",
    display: "grid",
    fontSize: 15,
    fontWeight: fonts.bold,
    gridAutoFlow: "column",
    justifySelf: "start",
    lineHeight: "38px",
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
    paddingLeft: 8,

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
    right: 16,
    top: "50%",
    transform: "translateY(-50%)",
  },

  ".rc-select-selection-item-remove": {
    cursor: "pointer",
    height: 18,
    width: 18,
  },

  backgroundColor: "white",
  border: `2px solid ${colors.red}`,
  borderRadius: 6,
  overflow: "hidden",
  position: "absolute",
  zIndex: 100,

  "&.rc-select-dropdown-hidden": {
    opacity: 0,
  },
}));
