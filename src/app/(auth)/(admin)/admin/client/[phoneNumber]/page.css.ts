import { css } from "@/theme";

export const wrapperClass = css({
  alignItems: "start",
  display: "grid",
  gap: 20,
  gridTemplateColumns: "repeat(2, 1fr)",
  marginBottom: 30,
});

export const labelClass = css(({ fonts }) => ({
  fontWeight: fonts.bold,
  marginBottom: 4,
}));

export const idClass = css(({ fonts }) => ({
  fontWeight: fonts.bold,
}));

export const linkClass = css(({ colors, fonts }) => ({
  borderRadius: 6,
  color: colors.black,
  columnGap: 10,
  display: "inline-grid",
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  padding: 8,

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, .2)",
  },
}));
