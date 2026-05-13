import { css } from "@/theme";

export const wrapperClass = css({
  paddingBlock: 60,
});

export const layoutClass = css(({ colors }) => ({
  border: `2px dashed ${colors.red}`,
  borderRadius: 12,
  display: "grid",
  gap: 24,
  marginInline: "auto",
  maxWidth: 480,
  padding: 32,
  textAlign: "center",
}));

export const titleClass = css(({ fonts }) => ({
  fontSize: 24,
  fontWeight: fonts.bold,
}));

export const summaryClass = css(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.medium,
}));

export const hintClass = css(({ colors }) => ({
  color: colors.grayDarker,
  fontSize: 14,
}));

export const buttonsClass = css({
  display: "grid",
  gap: 12,
});
