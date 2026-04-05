import { css } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
  alignItems: "center",
  backgroundColor: "white",
  borderBottom: `2px solid ${colors.black}`,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "space-between",
  marginBottom: 25,
  minHeight: 58,
  paddingBlock: 10,
  position: "sticky",
  top: 80,
  zIndex: 100,
}));

export const titleClass = css(({ fonts }) => ({
  fontSize: 26,
  fontWeight: fonts.bold,
}));
