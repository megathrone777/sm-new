import { css } from "@/theme";

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  marginBottom: 30,
  rowGap: 16,
});

export const itemClass = css({
  borderBottom: "1px solid #eee",
  paddingBottom: 12,
});

export const rowClass = css({
  alignItems: "end",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
});

export const editFormClass = css({
  alignItems: "end",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1.5fr",
});

export const linkClass = css({
  display: "inline-block",
  height: 38,
});
