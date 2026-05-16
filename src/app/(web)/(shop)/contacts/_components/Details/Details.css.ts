import { css } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
  backgroundColor: colors.whiteLighter,
  paddingBottom: 20,
  paddingTop: 40,
}));

export const titleClass = css(({ devices, fonts }) => ({
  fontSize: 24,
  fontWeight: fonts.medium,
  marginBottom: 15,
  textAlign: "center",

  "@media": {
    [devices.tablet]: {
      fontSize: 36,
      marginBottom: 30,
    },
  },
}));

export const layoutClass = css(({ devices }) => ({
  display: "grid",
  gap: 20,
  gridTemplateColumns: "1fr",

  "@media": {
    [devices.tablet]: {
      gap: 30,
      gridTemplateColumns: "1fr 1fr",
    },

    [devices.desktop]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
}));

export const buttonClass = css(({ colors, devices, easing, fonts }) => ({
  alignItems: "center",
  backgroundColor: colors.red,
  border: "none",
  borderRadius: 5,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
  color: "white",
  display: "inline-grid",
  fontFamily: "inherit",
  fontSize: 17,
  fontWeight: fonts.medium,
  height: 45,
  justifyContent: "center",
  lineHeight: 1,
  minWidth: 140,
  outline: "none",
  paddingInline: 10,
  textDecoration: "none",
  transition: `box-shadow 0.2s ${easing}`,
  userSelect: "none",

  ":disabled": {
    cursor: "default",
    opacity: 0.7,
  },

  ":hover": {
    boxShadow: "0 0 14px 0 rgba(218, 38, 40, 0.75)",
  },

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
}));

export const colClass = css(({ devices }) => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",

  "@media": {
    [devices.tablet]: {
      alignItems: "flex-start",
      textAlign: "left",
    },
  },
}));

export const imageColClass = css(({ devices }) => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  order: 3,
  textAlign: "center",

  "@media": {
    [devices.tablet]: {
      display: "none",
    },

    [devices.desktop]: {
      display: "flex",
      order: 2,
    },
  },
}));

export const instagramColClass = css(({ devices }) => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  order: 2,
  rowGap: 20,
  textAlign: "center",

  "@media": {
    [devices.desktop]: {
      order: 3,
    },
  },
}));

export const scheduleClass = css({
  fontSize: 20,
  lineHeight: "29px",
  marginBottom: 15,
  paddingLeft: 37,
  position: "relative",
});

export const scheduleIconClass = css({
  height: 24,
  left: 3,
  maxWidth: 24,
  position: "absolute",
  top: 3,
});

export const iconClass = css({
  color: "black",
  display: "inline-flex",
  height: 27,
  marginRight: 10,
  maxWidth: 27,
  verticalAlign: -7,
});

export const addressClass = css(({ devices }) => ({
  fontSize: 20,
  lineHeight: "27px",
  marginBottom: 15,
  whiteSpace: "break-spaces",

  "@media": {
    [devices.tablet]: {
      whiteSpace: "nowrap",
    },
  },
}));

export const addressLinkClass = css({
  color: "black",
  textDecoration: "none",

  ":hover": {
    textDecoration: "underline",
  },
});

export const phoneClass = css({
  marginBottom: 15,
});

export const phoneLinkClass = css({
  color: "black",
  display: "inline-block",
  fontSize: 20,
  textDecoration: "none",

  ":hover": {
    textDecoration: "underline",
  },
});

export const emailClass = css({
  color: "black",
  display: "inline-block",
  fontSize: 20,
  marginBottom: 30,
  textDecoration: "none",

  ":hover": {
    textDecoration: "underline",
  },
});

export const linksClass = css({
  marginBottom: 25,
  minHeight: 40,
  mixBlendMode: "difference",
});

export const secondaryTitleClass = css(({ devices, fonts }) => ({
  fontSize: 20,
  fontWeight: fonts.medium,
  marginBottom: 12,

  "@media": {
    [devices.tablet]: {
      fontSize: 27,
      marginBottom: 15,
    },
  },
}));

export const companyLineClass = css({
  fontSize: 17,
  marginBottom: 10,
  selectors: {
    "&:last-of-type": {
      marginBottom: 0,
    },
  },
});

export const imageHolderClass = css({
  height: 450,
  position: "relative",
  textAlign: "center",
});

export const imageClass = css({
  height: "100%",
  minWidth: 225,
  mixBlendMode: "multiply",
  width: "auto",
});

export const instagramTitleClass = css(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.bold,
  textWrap: "balance",
}));
