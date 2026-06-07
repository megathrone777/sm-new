import { style } from "@/theme";

export const wrapperClass = style({
  paddingBlock: 60,
});

export const layoutClass = style(({ colors }) => ({
  border: `2px dashed ${colors.red}`,
  borderRadius: 12,
  display: "grid",
  gap: 24,
  marginInline: "auto",
  maxWidth: 480,
  padding: 32,
  textAlign: "center",
}));

export const titleClass = style(({ fonts }) => ({
  fontSize: 24,
  fontWeight: fonts.bold,
}));

export const summaryClass = style(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.medium,
}));

export const hintClass = style(({ colors }) => ({
  color: colors.grayDarker,
  fontSize: 14,
}));

export const buttonsClass = style({
  display: "grid",
  gap: 12,
});
