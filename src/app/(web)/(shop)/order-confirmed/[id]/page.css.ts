import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  padding: "20px 8px 30px",

  "@media": {
    [devices.mobile]: {
      paddingTop: 30,
    },
  },
}));

export const layoutClass = css(({ devices }) => ({
  alignItems: "start",
  display: "grid",
  gridAutoFlow: "row",
  justifyItems: "stretch",
  marginBottom: 25,
  rowGap: 10,

  "@media": {
    [devices.desktop]: {
      gridAutoFlow: "column",
      gridTemplateColumns: "repeat(3, 1fr)",
      justifyContent: "space-around",
    },
  },
}));

export const contentClass = css(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  marginBottom: 15,

  selectors: {
    "&:first-of-type": {
      justifyItems: "start",
      justifySelf: "stretch",
      order: 1,
      width: "100%",
    },

    "&:last-of-type": {
      marginBottom: 0,
      order: 2,

      "@media": {
        [devices.tablet]: {
          order: 3,
        },
      },
    },

    "&:nth-of-type(2)": {
      order: 3,

      "@media": {
        [devices.tablet]: {
          order: 2,
        },
      },
    },
  },
  textAlign: "left",
}));

export const titleClass = css(({ devices, fonts }) => ({
  fontSize: 24,
  fontWeight: fonts.medium,
  lineHeight: 1.2,
  marginBottom: 15,
  textAlign: "center",
  textWrap: "balance",

  "@media": {
    [devices.tablet]: {
      fontSize: 36,
      marginBottom: 30,
    },
  },
}));

export const subtitleClass = css({
  textWrap: "balance",
  wordBreak: "break-word",
});

export const imageHolderClass = css({
  height: "auto",
  marginInline: "auto",
  maxWidth: 260,
  position: "relative",
  textAlign: "center",
  width: "100%",
});

export const linkClass = css({
  display: "block",
  height: "100%",
});

export const imageClass = css({
  height: "100%",
  marginInline: "auto",
  width: "auto",
});

export const footerClass = css({
  textAlign: "center",
});

export const itemClass = css({
  alignItems: "start",
  columnGap: 6,
  display: "inline-grid",
  fontSize: 18,
  gridAutoFlow: "column",
  marginBottom: 10,
});

export const itemLinkClass = css(({ colors, easing }) => ({
  color: colors.black,
  transition: `color .25s ${easing}`,

  ":hover": {
    color: colors.red,
  },
}));

export const labelClass = css(({ fonts }) => ({
  fontWeight: fonts.demi,
  lineHeight: "26px",
}));

export const valueClass = css(({ devices, fonts }) => ({
  fontWeight: fonts.normal,

  "@media": {
    [devices.desktopLg]: {
      whiteSpace: "nowrap",
    },
  },
}));

export const descriptionClass = css(({ devices }) => ({
  fontSize: 17,
  marginBottom: 15,
  maxWidth: 500,
  paddingLeft: 40,
  position: "relative",

  "@media": {
    [devices.mobile]: {
      fontSize: 18,
    },

    [devices.tablet]: {
      maxWidth: "none",
    },
  },
}));

export const iconClass = css({
  color: "lightgreen",
  display: "inline-block",
  height: 30,
  left: 0,
  maxWidth: 30,
  position: "absolute",
  top: -2,
});

export const subitemClass = css({
  alignItems: "center",
  columnGap: 6,
  display: "inline-grid",
  fontSize: 20,
  gridAutoFlow: "column",
  marginBottom: 10,
});

export const columnClass = css({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  rowGap: 20,
  textAlign: "center",
});
