import { style, globalStyle } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "auto 100%",
  overflow: "hidden",
  position: "relative",

  "@media": {
    [devices.tablet]: {
      minHeight: 500,
    },
  },
}));

export const imageClass = style({
  height: "auto",
  objectFit: "cover",
  width: "100%",
});

export const layoutClass = style(({ devices }) => ({
  marginInline: "auto",
  maxWidth: 1200,

  "@media": {
    [devices.tablet]: {
      height: 500,
    },
  },
}));

export const listClass = style(({ devices }) => ({
  alignContent: "stretch",
  alignItems: "flex-start",
  display: "flex",
  flexWrap: "wrap",
  height: "100%",
  inset: 0,
  justifyContent: "space-around",
  paddingBlock: "40px 20px",
  position: "relative",

  "@media": {
    [devices.mobile]: {
      paddingBottom: 40,
    },
  },
}));

export const itemClass = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  minWidth: 300,
  paddingTop: 50,
  position: "relative",
  width: "100%",
});

globalStyle(`.${itemClass}:first-of-type`, {
  backgroundImage: "url('/images/promo_column_bg.png')",
  backgroundPosition: "right 46px top 0",
  backgroundRepeat: "no-repeat",
  backgroundSize: 110,
  maxWidth: 300,
});

globalStyle(`.${itemClass}:last-of-type`, ({ devices }) => ({
  flex: "0 1 100%",
  flexDirection: "column",
  maxWidth: "33%",

  "@media": {
    [devices.tablet]: {
      flexDirection: "column-reverse",
      height: "100%",
      paddingTop: 30,
      rowGap: 20,
    },
  },
}));

export const itemImageHolderClass = style(({ devices }) => ({
  height: "auto",
  marginBottom: 20,
  marginInline: "auto",
  width: 200,

  "@media": {
    [devices.tablet]: {
      height: 200,
      marginLeft: 0,
      maxWidth: 350,
      width: "100%",
    },
  },
}));

globalStyle(`.${itemClass}:first-of-type .${itemImageHolderClass}`, {
  marginLeft: "auto",
});

globalStyle(`.${itemClass}:first-of-type .${itemImageHolderClass}`, ({ devices }) => ({
  "@media": {
    [devices.tablet]: {
      marginLeft: 0,
    },
  },
}));

export const itemImageClass = style(({ devices }) => ({
  display: "block",
  height: "auto",
  width: "100%",

  "@media": {
    [devices.tablet]: {
      height: "100%",
      objectFit: "contain",
    },
  },
}));

export const itemDescriptionClass = style(({ devices, fonts }) => ({
  color: "white",
  fontSize: 18,
  fontWeight: fonts.medium,
  letterSpacing: 1,
  textAlign: "center",

  "@media": {
    [devices.mobile]: {
      paddingLeft: 6,
    },

    [devices.desktop]: {
      fontSize: 20,
    },
  },
}));

globalStyle(`.${itemDescriptionClass} ul`, {
  lineHeight: "1.2",
  textAlign: "left",
});

globalStyle(`.${itemDescriptionClass} ul li`, {
  marginBottom: 5,
  whiteSpace: "nowrap",
});

globalStyle(`.${itemDescriptionClass} ul li::before`, {
  content: "'-'",
  display: "inline-block",
  marginRight: 5,
});

globalStyle(`.${itemDescriptionClass} > span`, ({ colors, devices }) => ({
  color: colors.yellowLighter,
  display: "block",
  fontSize: 46,
  fontWeight: 700,
  textAlign: "center",
  textShadow: `0 0 15px ${colors.yellowLighter}`,
  top: 175,
  whiteSpace: "nowrap",

  "@media": {
    [devices.tablet]: {
      fontSize: 80,
    },
  },
}));

globalStyle(`.${itemDescriptionClass} p`, {
  marginTop: 10,
  textAlign: "center",
});

globalStyle(`.${itemClass}:first-of-type svg`, {
  fill: "currentColor",
  position: "absolute",
  zIndex: 2,
});

globalStyle(`.${itemClass}:first-of-type svg:first-of-type`, {
  color: "white",
  left: 72,
  top: -48,
  transform: "rotate(60deg)",
  width: 200,
});

globalStyle(`.${itemClass}:first-of-type svg:first-of-type text`, {
  fontSize: 12,
  fontWeight: 700,
});

globalStyle(`.${itemClass}:first-of-type svg:last-of-type`, {
  left: 110,
  opacity: 0.7,
  top: -57,
  transform: "rotate(55deg)",
  width: 120,
});

globalStyle(`.${itemClass}:first-of-type svg:last-of-type text`, {
  fontSize: 10,
});

globalStyle(`.${itemClass}:first-of-type svg:first-of-type`, ({ devices }) => ({
  "@media": {
    [devices.tablet]: {
      top: -74,
    },
  },
}));

globalStyle(`.${itemClass}:first-of-type svg:last-of-type`, ({ devices }) => ({
  "@media": {
    [devices.tablet]: {
      top: -81,
    },
  },
}));
