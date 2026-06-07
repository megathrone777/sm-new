import { rgba, style, styleVariants } from "@/theme";

export const buttonClass = styleVariants(
  ({ devices }) => ({
    normal: {
      fontSize: 17,
      height: 45,
      minWidth: 140,
      paddingInline: 10,

      "@media": {
        [devices.tablet]: {
          fontSize: 18,
          height: 46,
          minWidth: 155,
        },

        [devices.desktop]: {
          fontSize: 21,
          height: 55,
          minWidth: 190,
          paddingInline: 15,
        },
      },
    },

    small: {
      fontSize: 16,
      height: 36,
      minWidth: 36,
      paddingInline: 4,
    },
  }),
  (template, { colors, easing, fonts }) => [
    {
      alignItems: "center",
      backgroundColor: colors.red,
      border: "none",
      borderRadius: 5,
      boxShadow: `0 0 10px 0 ${rgba(colors.black, 0.5)}`,
      color: "white",
      display: "inline-grid",
      fontFamily: "inherit",
      fontWeight: fonts.medium,
      justifyContent: "center",
      lineHeight: 1,
      outline: "none",
      textDecoration: "none",
      transition: `box-shadow 0.2s ${easing}`,
      userSelect: "none",

      ":disabled": {
        cursor: "default",
        opacity: 0.7,
      },

      ":hover": {
        boxShadow: `0 0 14px 0 ${rgba(colors.red, 0.75)}`,
      },
    },
    template,
  ],
);

export const iconClass = style({
  color: "white",
  minWidth: 18,
  width: 18,
});
