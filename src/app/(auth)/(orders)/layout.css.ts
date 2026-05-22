import { css } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
  backgroundColor: colors.black,
  display: "grid",
  gridAutoFlow: "row",
  gridTemplateRows: "80px 1fr",
  height: "100%",
}));
