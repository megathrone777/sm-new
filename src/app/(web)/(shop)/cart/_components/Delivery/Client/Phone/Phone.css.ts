import { css, cssVariants } from "@/theme";

export const inputWrapperClass = css(({ colors }) => ({
  alignContent: "center",
  alignItems: "center",
  borderBottom: `2px solid ${colors.red}`,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "auto 1fr",
  height: 36,
  justifyContent: "start",
  paddingLeft: 3,
}));

export const inputClass = cssVariants(
  ({ colors }) => ({
    default: {
      "::placeholder": {
        color: colors.grayDarker,
      },
    },

    error: {
      "::placeholder": {
        color: colors.red,
      },
    },
  }),
  (template, { fonts }) => [
    {
      appearance: "none",
      backgroundColor: "white",
      border: "none",
      borderRadius: 0,
      color: "black",
      fontFamily: "inherit",
      fontSize: 16,
      fontWeight: fonts.medium,
      height: "100%",
      position: "relative",
      width: "100%",
      zIndex: 3,

      ":-webkit-autofill": {
        boxShadow: "0 0 0 1000px white inset",
      },

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
