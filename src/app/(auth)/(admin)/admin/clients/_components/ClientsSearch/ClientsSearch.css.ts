import { css } from "@/theme";

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 4,
});

export const itemClass = css({
  height: 31,
});

export const linkClass = css(({ colors }) => ({
  alignItems: "center",
  borderRadius: 6,
  color: colors.black,
  columnGap: 10,
  display: "inline-grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(3, 1fr)",
  height: "100%",
  justifyItems: "start",
  paddingInline: 6,
  userSelect: "auto",
  whiteSpace: "nowrap",

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, .05)",
  },
}));

export const phoneClass = css(({ fonts }) => ({
  fontWeight: fonts.bold,
  whiteSpace: "nowrap",
}));
