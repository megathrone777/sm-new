import { css, cssVariant } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
  alignContent: "center",
  alignItems: "center",
  borderBottom: `2px solid ${colors.red}`,
  display: "grid",
  gridAutoFlow: "column",
  gridColumn: "1 / -1",
  height: 36,
  justifyContent: "start",
  justifySelf: "stretch",
  position: "relative",
}));

export const inputWrapperClass = css({
  position: "relative",
  zIndex: 11,
});

export const inputClass = cssVariant(
  ({ colors }) => ({
    default: {
      color: colors.black,
      selectors: {
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
          {
            WebkitTextFillColor: colors.black,
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

      ":focus": {
        color: colors.black,
      },
    },
  }),

  (template, { fonts }) => [
    {
      appearance: "none",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: 0,
      fontFamily: "inherit",
      fontSize: 16,
      fontWeight: fonts.medium,
      height: "100%",
      outline: "none",
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

export const placeholderClass = css(({ colors, fonts }) => ({
  color: colors.gray,
  fontFamily: "inherit",
  fontSize: 16,
  fontWeight: fonts.medium,
  height: 22,
  insetBlock: 0,
  left: -0,
  pointerEvents: "none",
  position: "absolute",
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

// export const popupClass = css(({ colors, fonts }) => ({
//   ".rc-select-item-empty": {
//     fontSize: "15px",
//     fontWeight: fonts.medium,
//     paddingBlock: "4px",
//     textAlign: "center",
//   },

//   ".rc-select-item-option": {
//     alignItems: "center",
//     cursor: "pointer",
//     display: "grid",
//     fontSize: "15px",
//     fontWeight: fonts.bold,
//     gridAutoFlow: "column",
//     justifySelf: "start",
//     lineHeight: "38px",
//     overflow: "hidden",
//     paddingBlock: 0,
//     position: "relative",
//     userSelect: "none",
//     whiteSpace: "nowrap",
//     width: "100%",

//     "&.rc-select-item-option-selected": {
//       backgroundColor: "rgba(0, 0, 0, .1)",
//     },

//     ":hover": {
//       backgroundColor: "rgba(0, 0, 0, .1)",
//     },
//   },

//   ".rc-select-item-option-content": {
//     paddingLeft: "8px",

//     ":hover": {
//       backgroundColor: "transparent",
//     },
//   },

//   ".rc-select-item-option .rc-select-item-option-state": {
//     alignItems: "center",
//     display: "grid",
//     justifyContent: "center",
//     pointerEvents: "none",
//     position: "absolute",
//     right: "16px",
//     top: "50%",
//     transform: "translateY(-50%)",
//   },

//   ".rc-select-selection-item-remove": {
//     cursor: "pointer",
//     height: "18px",
//     width: "18px",
//   },

//   backgroundColor: "white",
//   border: `2px solid ${colors.red}`,
//   borderRadius: "6px",
//   minWidth: "280px",
//   overflow: "hidden",
//   position: "absolute",
//   width: "280px",
//   zIndex: 100,

//   "&.rc-select-dropdown-hidden": {
//     opacity: 0,
//   },
// }));
