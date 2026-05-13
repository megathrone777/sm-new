import { css, cssVariant } from "@/theme";

export const wrapperClass = css({
  display: "grid",
});

export const layoutClass = css(({ colors }) => ({
  alignItems: "center",
  borderBottom: `2px solid ${colors.red}`,
  display: "grid",
  gridAutoFlow: "column",
  height: 36,
  justifyContent: "start",
}));

export const labelClass = css(({ fonts }) => ({
  cursor: "pointer",
  fontWeight: fonts.bold,
  justifySelf: "start",
  lineHeight: "normal",
  userSelect: "none",
}));

export const inputClass = cssVariant(
  ({ colors }) => ({
    default: {
      selectors: {
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
          {
            WebkitTextFillColor: "black",
          },
      },

      "::placeholder": {
        color: colors.grayDarker,
      },
    },

    error: {
      selectors: {
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
          {
            WebkitTextFillColor: colors.red,
          },
      },

      "::placeholder": {
        color: colors.red,
      },
    },
  }),
  (template, { fonts }) => [
    {
      appearance: "none",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: 0,
      color: "black",
      fontFamily: "inherit",
      fontSize: 16,
      fontWeight: fonts.medium,
      height: "100%",
      selectors: {
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
          {
            caretColor: "black",
            transition: "background-color 9999s ease-out",
            WebkitBoxShadow: "0 0 0 1000px white inset",
          },
      },
      width: "100%",

      ":disabled": {
        cursor: "not-allowed",
        opacity: 0.7,
      },

      ":focus": {
        outline: "none",
      },

      ":read-only": {
        cursor: "not-allowed",
        opacity: 0.7,
      },
    },
    template,
  ],
);

export const iconHolderClass = css({
  alignItems: "center",
  display: "grid",
  justifyContent: "center",
  minWidth: 30,
  width: 30,
});

export const iconClass = css(({ colors }) => ({
  color: colors.red,
  minWidth: 18,
  width: 18,
}));

export const errorIconClass = css(({ colors }) => ({
  color: colors.red,
  display: "block",
  height: 20,
  marginLeft: 4,
  minWidth: 20,
  selectors: {
    [`${layoutClass}:focus-within &`]: {
      display: "none",
    },
  },
  width: 20,
}));
