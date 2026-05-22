import { css, cssVariant } from "@/theme";

export const inputWrapperClass = css(({ colors }) => ({
  alignContent: "center",
  alignItems: "center",
  borderBottom: `2px solid ${colors.red}`,
  display: "grid",
  gridAutoFlow: "column",
  gridColumn: "1 / -1",
  height: 36,
  justifyContent: "start",
  justifySelf: "stretch",
}));

export const inputClass = cssVariant(
  ({ colors }) => ({
    default: {
      color: "black",
      selectors: {
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
          {
            WebkitTextFillColor: "black",
          },
      },
    },

    error: {
      color: colors.red,
      selectors: {
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
          {
            WebkitTextFillColor: colors.red,
          },
      },
    },
  }),

  (template, { fonts }) => [
    {
      appearance: "none",
      backgroundColor: "white",
      border: "none",
      borderRadius: 0,
      fontFamily: "inherit",
      fontSize: 16,
      fontWeight: fonts.medium,
      height: "100%",
      position: "relative",
      selectors: {
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
          {
            caretColor: "black",
            transition: "background-color 9999s ease-out",
            WebkitBoxShadow: "0 0 0 1000px white inset",
          },
      },
      width: "100%",
      zIndex: 3,

      ":disabled": {
        cursor: "not-allowed",
        opacity: 0.7,
      },

      ":focus": {
        outline: "none",
      },
    },
    template,
  ],
);

export const layoutClass = css(({ colors }) => ({
  ".rc-select-content": {
    alignItems: "center",
    display: "grid",
    minHeight: "100%",
    paddingTop: 0,
  },

  ".rc-select-input": {
    background: "transparent",
    border: "none",
    borderColor: colors.red,
    borderRadius: "8px",
    cursor: "pointer",
    inset: 0,
    margin: 0,
    minHeight: "17px",
    opacity: 0,
    outline: "none",
    padding: 0,
    position: "absolute",

    ":focus": {
      borderColor: colors.red,
      outline: "none",
    },
  },

  alignItems: "center",
  display: "grid",
  height: "100%",
  justifyContent: "center",
  position: "relative",
  width: 30,
}));

export const errorIconClass = css(({ colors }) => ({
  color: colors.red,
  display: "block",
  height: 20,
  marginLeft: 4,
  minWidth: 20,
  selectors: {
    [`${inputWrapperClass}:focus-within &`]: {
      display: "none",
    },
  },
  width: 20,
}));

export const optionClass = css({
  paddingBlock: 0,
  paddingRight: 8,
});

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
    fontSize: "15px",
    fontWeight: fonts.medium,
    paddingBlock: "4px",
    textAlign: "center",
  },

  ".rc-select-item-option": {
    alignItems: "center",
    cursor: "pointer",
    display: "grid",
    fontSize: "15px",
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
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
  },

  ".rc-select-selection-item-remove": {
    cursor: "pointer",
    height: "18px",
    width: "18px",
  },

  backgroundColor: "white",
  border: `2px solid ${colors.red}`,
  borderRadius: "6px",
  minWidth: "280px",
  overflow: "hidden",
  position: "absolute",
  width: "280px",
  zIndex: 100,

  "&.rc-select-dropdown-hidden": {
    opacity: 0,
  },
}));
