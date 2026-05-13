import { css } from "@/theme";

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 16,
});

export const itemClass = css({
  borderBottom: "1px solid #eee",
  paddingBottom: 12,
});

export const formClass = css({
  alignItems: "end",
  columnGap: 12,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr 1fr",
});
