import { style } from "@/theme";

export const wrapperClass = style(() => ({
  alignItems: "center",
  display: "inline-grid",
  gridAutoFlow: "column",
}));

export const quantityClass = style(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.bold,
  height: 24,
  lineHeight: "24px",
  textAlign: "center",
  verticalAlign: "middle",
  width: 48,
}));
