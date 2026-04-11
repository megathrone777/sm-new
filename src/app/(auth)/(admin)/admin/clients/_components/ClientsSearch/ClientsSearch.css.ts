import { css } from "@/theme";

export const listClass = css({
  display: "grid",
  gridTemplateColumns: "max-content 1px max-content 1px max-content",
  rowGap: 4,
});

export const itemClass = css({
  display: "grid",
  gridColumn: "1 / -1",
  gridTemplateColumns: "subgrid",
  height: 31,
});

export const linkClass = css(({ colors }) => ({
  alignItems: "center",
  borderRadius: 6,
  color: colors.black,
  columnGap: 10,
  display: "grid",
  gridColumn: "1 / -1",
  gridTemplateColumns: "subgrid",
  height: "100%",
  justifyItems: "center",
  paddingInline: 6,
  userSelect: "auto",
  whiteSpace: "nowrap",

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, .05)",
  },
}));

export const textClass = css({
  display: "inline-block",
  paddingInline: 6,
});

export const phoneClass = css(({ fonts }) => ({
  display: "inline-block",
  fontWeight: fonts.bold,
  paddingInline: 6,
  whiteSpace: "nowrap",
}));
