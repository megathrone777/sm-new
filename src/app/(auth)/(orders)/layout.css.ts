import { style } from "@/theme";

export const wrapperClass = style(({ colors }) => ({
  backgroundColor: colors.black,
  display: "grid",
  gridAutoFlow: "row",
  gridTemplateRows: "80px 1fr",
  height: "100%",
}));
