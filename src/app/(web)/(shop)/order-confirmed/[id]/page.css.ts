import { css } from "@/theme";

export const wrapperClass = css({
  paddingBlock: 30,
});

export const layoutClass = css(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  justifyItems: "stretch",
  marginBottom: 25,
  rowGap: 10,

  "@media": {
    [devices.tablet]: {
      gridAutoFlow: "column",
      gridTemplateColumns: "repeat(3, 1fr)",
      justifyContent: "space-around",
    },
  },
}));

export const contentClass = css(({ devices }) => ({
  marginBottom: 15,
  selectors: {
    "&:first-of-type": {
      justifySelf: "stretch",
      order: 1,
      paddingLeft: 10,
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
  height: 450,
  marginInline: "auto",
  position: "relative",
  textAlign: "center",
  width: "auto",
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
  fontSize: 18,
  marginBottom: 10,
});

export const descriptionClass = css(({ devices }) => ({
  fontSize: 16,
  marginBottom: 15,
  maxWidth: 500,
  paddingLeft: 40,
  position: "relative",

  "@media": {
    [devices.mobile]: {
      fontSize: 18,
    },
  },
}));

export const iconClass = css({
  color: "lightgreen",
  display: "inline-block",
  left: 0,
  maxWidth: 30,
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  verticalAlign: "middle",
});

export const subitemClass = css({
  fontSize: 20,
  marginBottom: 10,
});

export const columnClass = css({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  rowGap: 20,
  textAlign: "center",
});
