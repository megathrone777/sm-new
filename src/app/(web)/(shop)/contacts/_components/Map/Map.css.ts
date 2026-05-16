import { css } from "@/theme";

export const mapClass = css(({ colors }) => ({
  borderTop: `4px solid ${colors.red}`,
  display: "block",
  height: 450,
  marginBottom: -4,
  width: "100%",
}));
