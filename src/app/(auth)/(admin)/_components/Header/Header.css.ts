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
  paddingBlock: "16px 10px",
  position: "sticky",
  top: 80,
  zIndex: 100,
}));

export const titleClass = css(({ fonts }) => ({
  fontSize: 26,
  fontWeight: fonts.bold,
  minHeight: 42,
}));

export const layoutClass = css({
  alignContent: "center",
  alignItems: "center",
  columnGap: 40,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "max-content",
});
