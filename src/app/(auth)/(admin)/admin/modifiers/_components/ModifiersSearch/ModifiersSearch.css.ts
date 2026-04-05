import { css } from "@/theme";

export const linkClass = css(({ colors, fonts }) => ({
  alignItems: "center",
  borderRadius: 6,
  color: colors.black,
  columnGap: 8,
  display: "grid",
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  justifyContent: "start",
  padding: 6,
  whiteSpace: "nowrap",

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, .1)",
  },
}));

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 4,
});
