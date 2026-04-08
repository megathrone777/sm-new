import { css } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
  alignContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  borderBottom: `2px solid ${colors.black}`,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "space-between",
  marginBottom: 25,
  minHeight: 70,
  paddingBottom: 10,
  paddingTop: 16,
  position: "sticky",
  top: 80,
  zIndex: 100,
}));

export const titleClass = css(({ fonts }) => ({
  fontSize: 26,
  fontWeight: fonts.bold,
}));

export const layoutClass = css({
  alignContent: "center",
  alignItems: "center",
  columnGap: 40,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "max-content"
});
