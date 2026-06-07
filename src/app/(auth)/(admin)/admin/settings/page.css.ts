import { style } from "@/theme";

export const listClass = style({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 40,
});

export const itemClass = style({
  borderBottom: "1px solid #eee",
  paddingBottom: 16,
});

export const titleClass = style(({ fonts }) => ({
  fontWeight: fonts.bold,
  marginBottom: 8,
}));

export const imageRowClass = style({
  columnGap: 24,
  display: "grid",
  gridAutoColumns: "1fr",
  gridAutoFlow: "column",
});

export const settingsFormClass = style({
  display: "grid",
  gap: 30,
  gridTemplateColumns: "repeat(2, 1fr)",
});

export const wideClass = style({
  gridColumn: "1 / -1",
});

export const flagsClass = style({
  columnGap: 24,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
});

export const textareaClass = style(({ colors }) => ({
  border: `1px solid ${colors.grayDarker}`,
  borderRadius: 4,
  fontFamily: "inherit",
  fontSize: 14,
  minHeight: 80,
  padding: 8,
  resize: "vertical",
  width: "100%",
}));
