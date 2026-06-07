import { style } from "@/theme";

export const gridClass = style({
  columnGap: 16,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  rowGap: 16,
});

export const itemClass = style({
  border: "1px solid #eee",
  borderRadius: 8,
  padding: 16,
});

export const titleClass = style(({ fonts }) => ({
  fontSize: 14,
  fontWeight: fonts.bold,
  marginBottom: 8,
}));

export const textareaClass = style(({ colors }) => ({
  border: `1px solid ${colors.grayDarker}`,
  borderRadius: 4,
  fontFamily: "inherit",
  fontSize: 14,
  minHeight: 110,
  padding: 8,
  resize: "vertical",
  width: "100%",
}));

export const hintClass = style(({ colors, fonts }) => ({
  color: colors.grayDarker,
  fontSize: 12,
  fontWeight: fonts.medium,
  marginTop: 8,
}));
