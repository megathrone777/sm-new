import { style } from "@/theme";

export const listClass = style({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const itemClass = style({
  border: "1px solid #eee",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 16,
});

export const itemHeaderClass = style({
  alignItems: "flex-start",
  display: "flex",
  gap: 16,
});

export const imageRowClass = style({
  display: "flex",
  flex: 1,
  flexWrap: "wrap",
  gap: 16,
});

export const itemFormClass = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

export const linkClass = style({
  flexShrink: 0,
  marginTop: 4,
});
