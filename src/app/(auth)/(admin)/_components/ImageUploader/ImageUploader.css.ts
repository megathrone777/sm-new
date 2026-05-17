import { css } from "@/theme";

export const wrapperClass = css({
  display: "grid",
  gridAutoFlow: "row",
  justifyContent: "center",
  rowGap: 8,
});

export const imageClass = css({
  borderRadius: 8,
  height: 360,
  objectFit: "cover",
  width: "auto",
});
