import { style, styleVariants } from "@/theme";

export const listClass = style(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "center",
  listStyle: "none",
  margin: 0,
  marginInline: "auto",
  maxWidth: 320,
  padding: 0,

  "@media": {
    [devices.mobile]: {
      columnGap: 30,
      maxWidth: "100%",
    },
  },
}));

export const itemClass = styleVariants(
  ({ devices }) => ({
    instagram: {},

    phone: {
      backgroundPositionY: -225,

      "@media": {
        [devices.mobile]: {
          backgroundPositionY: -246,
        },
      },
    },

    telegram: {
      backgroundPositionY: -68,

      "@media": {
        [devices.mobile]: {
          backgroundPositionY: -74,
        },
      },
    },

    viber: {
      backgroundPositionY: -304,

      "@media": {
        [devices.mobile]: {
          backgroundPositionY: -332,
        },
      },
    },

    whatsapp: {
      backgroundPositionY: -147,

      "@media": {
        [devices.mobile]: {
          backgroundPositionY: -160,
        },
      },
    },
  }),

  (variant, { devices, easing }) => [
    {
      background: "url('/images/contact_links_bg.png') center top/100% auto no-repeat",
      height: 55,
      transform: "scale(0.9)",
      transition: `transform .5s ${easing}`,
      width: 55,

      "@media": {
        [devices.pointerFine]: {
          ":hover": {
            transform: "scale(1.1)",
          },
        },

        [devices.mobile]: {
          height: 60,
          transform: "scale(1)",
          width: 60,
        },
      },
    },
    variant,
  ],
);

export const linkClass = style({
  display: "block",
  height: "100%",
  overflow: "hidden",
  textIndent: -9999,
  width: "100%",
});
