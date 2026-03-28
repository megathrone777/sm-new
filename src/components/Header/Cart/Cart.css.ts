import { css } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
  alignItems: "center",
  backgroundColor: colors.red,
  border: "3px solid white",
  borderRadius: "50%",
  boxShadow: `0 0 0 3px ${colors.red}`,
  display: "flex",
  height: 70,
  justifyContent: "center",
  marginLeft: 70,
  outline: `3px solid ${colors.red}`,
  padding: 5,
  position: "fixed",
  right: 30,
  top: 24,
  width: 70,
  zIndex: 101,

  // [devices.tablet]: {
  //   display: "none",
  // },
}));

export const linkClass = css({
  alignItems: "center",
  color: "white",
  cursor: "pointer",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  overflow: "hidden",
  textIndent: -9999,
  width: "100%",
});

export const iconClass = css({
  display: "block",
  height: 35,
  width: 35,
});

export const amountClass = css(({ fonts }) => ({
  backgroundColor: "white",
  borderRadius: "50%",
  bottom: -5,
  color: "black",
  fontSize: 16,
  fontWeight: fonts.bold,
  minWidth: 25,
  padding: 3,
  position: "absolute",
  right: -5,
  textAlign: "center",
  userSelect: "none",
}));
