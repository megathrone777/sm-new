import { rgba, style } from "@/theme";

export const wrapperClass = style({
  alignItems: "start",
  display: "grid",
  gap: 20,
  gridTemplateColumns: "repeat(2, 1fr)",
  marginBottom: 30,
});

export const labelClass = style(({ fonts }) => ({
  fontWeight: fonts.bold,
  marginBottom: 4,
}));

export const idClass = style(({ fonts }) => ({
  fontWeight: fonts.bold,
}));

export const linkClass = style(({ colors, fonts }) => ({
  borderRadius: 6,
  color: colors.black,
  columnGap: 10,
  display: "inline-grid",
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  padding: 8,

  ":hover": {
    backgroundColor: rgba(colors.black, 0.2),
  },
}));
