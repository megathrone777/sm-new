import { style, styleVariants } from "@/theme";

export const wrapperClass = style(({ colors }) => ({
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

export const inputWrapperClass = style({
  position: "relative",
  zIndex: 11,
});

export const inputClass = styleVariants(
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

export const placeholderClass = style(({ colors, fonts }) => ({
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

export const errorIconClass = style(({ colors }) => ({
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
