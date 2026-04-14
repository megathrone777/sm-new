import { css } from "@/theme";

export const wrapperClass = css(() => ({
  alignItems: "center",
  display: "inline-grid",
  gridAutoFlow: "column",
}));

export const quantityClass = css(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.bold,
  height: 24,
  lineHeight: "24px",
  textAlign: "center",
  verticalAlign: "middle",
  width: 50,
}));
