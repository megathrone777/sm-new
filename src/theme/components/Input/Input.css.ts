import { css, cssVariant } from "@/theme";

export const wrapperClass = css({
  display: "grid",
});

export const layoutClass = cssVariant(
  ({ devices }) => ({
    default: {
      height: 36,
    },

    light: {
      height: 36,

      "@media": {
        [devices.desktop]: {
          fontSize: 19,
          height: 42,
        },
      },
    },
  }),

  (variant, { colors }) => [
    {
      alignItems: "center",
      borderBottom: `2px solid ${colors.red}`,
      display: "grid",
      gridAutoFlow: "column",
      justifyContent: "start",
    },
    variant,
  ],
);

export const labelClass = css(({ fonts }) => ({
  cursor: "pointer",
  fontWeight: fonts.bold,
  justifySelf: "start",
  lineHeight: "normal",
  userSelect: "none",
}));

export const inputClass = cssVariant(
  ({ colors, devices }) => ({
    default: {
      color: "black",
      selectors: {
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
          {
            caretColor: "black",
            transition: "background-color 9999s ease-out",
            WebkitBoxShadow: "0 0 0 1000px white inset",
            WebkitTextFillColor: "black",
          },
      },

      "::placeholder": {
        color: colors.grayDarker,
      },
    },

    error: {
      color: "black",
      selectors: {
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
          {
            caretColor: "black",
            transition: "background-color 9999s ease-out",
            WebkitBoxShadow: "0 0 0 1000px white inset",
            WebkitTextFillColor: colors.red,
          },
      },

      "::placeholder": {
        color: colors.red,
      },
    },

    light: {
      color: "white",
      selectors: {
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
          {
            caretColor: "white",
            transition: "background-color 9999s ease-out",
            WebkitBoxShadow: "0 0 0 1000px black inset",
            WebkitTextFillColor: "white",
          },
      },

      "::placeholder": {
        color: "rgba(255, 255, 255, .5)",
      },

      "@media": {
        [devices.desktop]: {
          fontSize: 18,
        },
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
      width: "100%",

      ":disabled": {
        cursor: "not-allowed",
        opacity: 0.7,
      },

      ":focus": {
        outline: "none",

        "::placeholder": {
          color: "transparent",
        },
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
    [`${wrapperClass}:focus-within &`]: {
      display: "none",
    },
  },
  width: 20,
}));
