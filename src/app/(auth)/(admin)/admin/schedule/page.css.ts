import { css } from "@/theme";

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 30,
});

export const itemClass = css({
  borderBottom: "1px dashed #ddd",
  paddingBottom: 12,
});

export const dayTitleClass = css(({ fonts }) => ({
  fontWeight: fonts.bold,
  marginBottom: 8,
  textTransform: "capitalize",
}));

export const formClass = css({
  columnGap: 12,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
});
