import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  backgroundImage: "url('/images/products_bg.jpg')",
  backgroundSize: "50% auto",
  overflow: "hidden",
  paddingBlock: 40,
  position: "relative",
  textAlign: "center",

  "@media": {
    [devices.tablet]: {
      borderTop: "3px solid #da2629",
      paddingBlock: 60,
    },
  },
}));

export const titleClass = css(({ devices }) => ({
  fontSize: 28,
  fontWeight: "700",
  letterSpacing: 1,
  marginBottom: 40,
  textAlign: "center",

  "@media": {
    [devices.tablet]: {
      fontSize: 40,
    },
  },
}));

export const listClass = css(({ devices }) => ({
  alignItems: "center",
  columnGap: "unset",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  marginBottom: 40,
  rowGap: 20,

  "@media": {
    [devices.tablet]: {
      columnGap: 75,
      flexDirection: "row",
      marginBottom: 60,
    },

    [devices.desktop]: {
      columnGap: 10,
    },
  },
}));

export const itemClass = css(({ devices }) => ({
  backgroundColor: "white",
  borderRadius: 15,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
  flex: "none",
  maxWidth: 380,
  paddingBlock: "35px 30px",
  width: "100%",

  "@media": {
    [devices.tablet]: {
      flex: "0 1 33.3333%",
      maxWidth: "none",
      width: "auto",
    },
  },
}));

export const textClass = css({
  fontWeight: "500",
  marginBottom: 15,
  textAlign: "center",
});

export const countClass = css({
  fontWeight: "500",
  marginBottom: 5,
  textAlign: "center",
});

export const linkClass = css({
  color: "#da2629",
  fontSize: 18,
  fontWeight: "500",

  ":hover": {
    textDecoration: "underline",
  },
});

export const buttonsClass = css({
  display: "flex",
  justifyContent: "center",
});

export const imageClass = css({
  marginBottom: 10,
  maxHeight: 100,
});

export const ratingImageClass = css({
  display: "block",
  margin: "0 auto 15px",
  maxWidth: 120,
});