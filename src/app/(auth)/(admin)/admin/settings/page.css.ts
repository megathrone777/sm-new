import { css } from "@/theme";

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 32,
});

export const itemClass = css({
  borderBottom: "1px solid #eee",
  paddingBottom: 16,
});

export const titleClass = css(({ fonts }) => ({
  fontWeight: fonts.bold,
  marginBottom: 8,
}));

export const imageRowClass = css({
  columnGap: 24,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr 1fr",
});

export const settingsFormClass = css({
  columnGap: 12,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  rowGap: 12,
});

export const wideClass = css({
  gridColumn: "1 / -1",
});

export const flagsClass = css({
  columnGap: 24,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
});

export const textareaClass = css(({ colors }) => ({
  border: `1px solid ${colors.grayDarker}`,
  borderRadius: 4,
  fontFamily: "inherit",
  fontSize: 14,
  minHeight: 80,
  padding: 8,
  resize: "vertical",
  width: "100%",
}));
