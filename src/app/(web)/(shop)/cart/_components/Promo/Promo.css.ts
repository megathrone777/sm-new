import { rgba, style } from "@/theme";

export const layoutClass = style({
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

export const loadingWrapperClass = style({
  height: 25,
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 25,
});

export const successLayoutClass = style({
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

export const resetButtonClass = style(({ colors }) => ({
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

export const submitClass = style({
  height: "100%",
  minWidth: 25,
  position: "relative",
});

export const buttonClass = style(({ colors, fonts }) => ({
  backgroundColor: colors.red,
  border: "none",
  borderRadius: 5,
  boxShadow: `0 0 8px 0 ${rgba(colors.black, 0.3)}`,
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
  transition: "box-shadow .2s ease-in",

  ":hover": {
    boxShadow: `0 0 12px 0 ${rgba(colors.red, 0.4)}`,
  },
}));
