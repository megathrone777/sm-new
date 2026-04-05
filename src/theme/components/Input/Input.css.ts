import { css, cssVariants } from "@/theme";

export const wrapperClass = css({
  display: "grid",
});

export const layoutClass = css(({ colors }) => ({
  alignItems: "center",
  borderBottom: `2px solid ${colors.red}`,
  display: "grid",
  gridAutoFlow: "column",
  height: 36,
}));

export const labelClass = css(({ fonts }) => ({
  cursor: "pointer",
  fontWeight: fonts.bold,
  justifySelf: "start",
  lineHeight: "normal",
  userSelect: "none",
}));

export const inputClass = cssVariants(
  ({ colors }) => ({
    isDefault: {
      "::placeholder": {
        color: colors.grayDarker,
      },
    },

    isError: {
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
      gridColumn: "1fr",
      height: "100%",
      width: "100%",

      ":-webkit-autofill": {
        boxShadow: "0 0 0 1000px white inset",
      },

      ":focus": {
        outline: "none",
      },
    },
    template,
  ],
);

export const iconClass = css(({ colors }) => ({
  color: colors.red,
  minWidth: 18,
  width: 18,
}));

export const errorIconClass = css(({ colors }) => ({
  color: colors.red,
  display: "block",
  height: 20,
  minWidth: 20,
  width: 20,
}));
