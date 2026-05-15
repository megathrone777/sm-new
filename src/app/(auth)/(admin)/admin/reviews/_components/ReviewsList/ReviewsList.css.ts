import { style } from "@vanilla-extract/css";

export const listClass = style({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const itemClass = style({
  alignItems: "flex-start",
  display: "flex",
  gap: 16,
});

export const itemFormClass = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 12,
});

export const linkClass = style({
  marginTop: 32,
});

export const imageRowClass = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 16,
});
