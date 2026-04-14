import { css } from "@/theme";

export const wrapperClass = css({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 20,
});

export const phoneWrapperClass = css({
  alignItems: "center",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
});
