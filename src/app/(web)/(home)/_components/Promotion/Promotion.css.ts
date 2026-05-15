import { css, globalStyle } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  overflow: "hidden",
  position: "relative",

  "@media": {
    [devices.tablet]: {
      minHeight: 480,
    },

    [devices.desktop]: {
      minHeight: 560,
    },
  },
}));

export const imageClass = css({
  height: "100%",
  left: 0,
  objectFit: "cover",
  position: "absolute",
  top: 0,
  width: "100%",
});

export const layoutClass = css(({ devices }) => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column-reverse",
  gap: 20,
  paddingBlock: 20,
  paddingInline: 16,
  position: "relative",

  "@media": {
    [devices.tablet]: {
      alignItems: "center",
      flexDirection: "row",
      gap: 0,
      inset: 0,
      justifyContent: "space-around",
      marginInline: "auto",
      maxWidth: 1200,
      padding: "40px 0",
      position: "absolute",
    },
  },
}));

export const itemClass = css(({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  maxWidth: 300,
  position: "relative",
  selectors: {
    "&:first-of-type": {
      background: "url('/images/promo_column_bg.png') right 35px top 130px / 130px auto no-repeat",
    },

    "&:last-of-type": {
      flexDirection: "column-reverse",
      justifyContent: "flex-end",
    },
  },
  width: "100%",

  "@media": {
    [devices.tablet]: {
      width: 300,
    },
  },
}));

globalStyle(`.${itemClass}:first-of-type`, {
  "@media": {
    "(min-width: 768px)": {
      backgroundPosition: "right 46px top 0",
      backgroundSize: "110px auto",
    },
  },
});

globalStyle(`.${itemClass}:last-of-type`, {
  "@media": {
    "(min-width: 768px)": {
      flex: "0 1 100%",
      maxWidth: "33%",
    },
  },
});

export const itemImageHolderClass = css(({ devices }) => ({
  marginBottom: 20,
  marginInline: "auto",
  maxWidth: 200,

  "@media": {
    [devices.tablet]: {
      height: 200,
      maxWidth: 350,
    },
  },
}));

globalStyle(`.${itemClass}:first-of-type .${itemImageHolderClass}`, {
  marginLeft: "auto",
});

globalStyle(`.${itemClass}:first-of-type .${itemImageHolderClass}`, {
  "@media": {
    "(min-width: 768px)": {
      marginLeft: 0,
    },
  },
});

export const itemImageClass = css(({ devices }) => ({
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

export const itemDescriptionClass = css(({ devices, fonts }) => ({
  color: "white",
  fontSize: 18,
  fontWeight: fonts.medium,
  letterSpacing: 1,
  textAlign: "center",

  "@media": {
    [devices.desktop]: {
      fontSize: 20,
    },
  },
}));

globalStyle(`.${itemDescriptionClass} ul`, {
  textAlign: "left",
});

globalStyle(`.${itemDescriptionClass} ul li`, {
  marginBottom: 5,
});

globalStyle(`.${itemDescriptionClass} ul li::before`, {
  content: "'-'",
  display: "inline-block",
  marginRight: 5,
});

globalStyle(`.${itemDescriptionClass} span`, {
  color: "#ffcc00",
  display: "block",
  fontSize: 80,
  fontWeight: 700,
  textAlign: "center",
  textShadow: "0 0 15px #ffcc00",
  whiteSpace: "nowrap",
});

globalStyle(`.${itemDescriptionClass} p`, {
  marginTop: 10,
  textAlign: "center",
});
