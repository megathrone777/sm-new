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
    minHeight: 32,
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
    minHeight: 32,
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
  border: `2px solid ${colors.red}`,
  borderRadius: 6,
  color: "black",
  fontFamily: "inherit",
  fontSize: 16,
  fontWeight: fonts.medium,
  height: "100%",
  minHeight: 32,
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

export const suffixClass = css(({ colors }) => ({
  color: colors.black,
  height: 18,
  position: "absolute",
  right: 6,
  top: "50%",
  transform: "translateY(-50%) rotate(180deg)",
  width: 18,
}));

export const searchWrapperClass = css(({ colors }) => ({
  borderBottom: `1px solid ${colors.red}`,
  padding: 6,
}));

export const searchInputClass = css(({ colors, fonts }) => ({
  border: `1px solid ${colors.red}`,
  borderRadius: 4,
  fontFamily: "inherit",
  fontSize: 14,
  fontWeight: fonts.medium,
  outline: "none",
  paddingBlock: 4,
  paddingInline: 8,
  width: "100%",

  ":focus": {
    borderColor: colors.red,
  },
}));

export const popupClass = css(({ colors, fonts }) => ({
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
    display: "none",
  },
}));
