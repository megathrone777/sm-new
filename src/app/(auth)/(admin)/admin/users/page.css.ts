import { css } from "@/theme";

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  marginBottom: 30,
  rowGap: 20,
});

export const itemClass = css({
  alignItems: "end",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
  paddingRight: 7,
});

export const formClass = css({
  alignItems: "end",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr 1fr 1fr auto",
});

export const createFormClass = css({
  display: "grid",
  gridAutoFlow: "row",
  marginLeft: "auto",
  paddingBottom: 40,
  rowGap: 20,
  width: 400,
});
