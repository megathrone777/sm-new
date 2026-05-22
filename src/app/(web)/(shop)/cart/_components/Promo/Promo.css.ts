import { css } from "@/theme";

export const layoutClass = css({
  alignContent: "start",
  alignItems: "start",
  border: "none",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
  maxWidth: 450,
  paddingTop: 10,
  position: "relative",

  ":disabled": {
    opacity: 0.5,
    pointerEvents: "none",
  },
});

export const loadingWrapperClass = css({
  height: 25,
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 25,
});

export const successLayoutClass = css({
  backgroundColor: "green",
  borderRadius: "50%",
  color: "white",
  display: "block",
  height: 25,
  overflow: "hidden",
  paddingInline: 6,
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 25,
});

export const resetButtonClass = css(({ colors }) => ({
  backgroundColor: "transparent",
  border: "none",
  bottom: 6,
  color: colors.black,
  cursor: "pointer",
  display: "block",
  height: 25,
  position: "absolute",
  right: 50,
  width: 25,

  ":focus": {
    opacity: 0,
  },
}));

export const submitClass = css({
  height: "100%",
  minWidth: 25,
  position: "relative",
});

export const buttonClass = css(({ colors, fonts }) => ({
  backgroundColor: colors.red,
  border: "none",
  borderRadius: 5,
  boxShadow: "0 0 8px 0 rgba(0, 0, 0, .3)",
  color: "white",
  cursor: "pointer",
  display: "inline-block",
  fontFamily: "inherit",
  fontSize: 20,
  fontWeight: fonts.medium,
  height: 35,
  lineHeight: "35px",
  minWidth: 120,
  padding: "0 10px",
  textAlign: "center",
  textDecoration: "none",
  transition: ".2s ease-in",

  ":hover": {
    boxShadow: "0 0 12px 0 rgba(218, 38, 40, 0.4)",
  },
}));
