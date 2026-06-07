import { style } from "@/theme";

export const mapClass = style(({ colors }) => ({
  borderTop: `4px solid ${colors.red}`,
  display: "block",
  height: 450,
  marginBottom: -4,
  width: "100%",
}));
