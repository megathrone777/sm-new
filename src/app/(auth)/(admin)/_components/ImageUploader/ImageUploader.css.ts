import { style } from "@/theme";

export const wrapperClass = style({
  display: "grid",
  gridAutoFlow: "row",
  justifyContent: "center",
  rowGap: 8,
});

export const imageClass = style({
  borderRadius: 8,
  height: 360,
  objectFit: "cover",
  width: "auto",
});
