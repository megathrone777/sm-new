import { style, styleVariants } from "@/theme";

export const wrapperClass = style({
  marginBottom: 25,
});

export const contactListClass = style(({ devices }) => ({
  columnGap: 15,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "center",

  "@media": {
    [devices.mobile]: {
      columnGap: 30,
    },
  },
}));

export const contactItemClass = styleVariants(
  {
    instagram: {
      backgroundPositionY: 0,
    },
    phone: {
      backgroundPositionY: -164,
    },
    telegram: {
      backgroundPositionY: -49,
    },
    viber: {
      backgroundPositionY: -221,
    },
    whatsapp: {
      backgroundPositionY: -106,
    },
  },
  (variant, { devices, easing }) => [
    {
      background: "url('/images/contact_links_bg.png') center top/100% auto no-repeat",
      height: 40,
      mixBlendMode: "difference",
      transform: "scale(0.9)",
      transition: `transform .5s ${easing}`,
      width: 40,

      "@media": {
        [devices.pointerFine]: {
          ":hover": {
            transform: "scale(1.1)",
          },
        },

        [devices.mobile]: {
          transform: "scale(1)",
        },
      },
    },
    variant,
  ],
);

export const contactLinkClass = style(({ devices }) => ({
  color: "white",
  display: "block",
  height: "100%",
  overflow: "hidden",
  textIndent: -9999,

  "@media": {
    [devices.pointerFine]: {
      ":hover": {
        textDecoration: "underline",
      },
    },
  },
}));

export const itemClass = style({
  marginBottom: 17,
  textAlign: "center",
});

export const linkClass = style(({ devices }) => ({
  color: "white",
  display: "inline-block",

  "@media": {
    [devices.pointerFine]: {
      ":hover": {
        textDecoration: "underline",
      },
    },
  },
}));

export const emailClass = style(({ devices }) => ({
  color: "white",
  display: "inline-block",
  fontSize: 14,
  marginBottom: 10,
  textDecoration: "none",

  "@media": {
    [devices.pointerFine]: {
      ":hover": {
        textDecoration: "underline",
      },
    },
  },
}));

export const textClass = style({
  color: "white",
  fontSize: 14,
  marginBottom: 8,
});

export const infoClass = style({
  paddingTop: 17,
});
