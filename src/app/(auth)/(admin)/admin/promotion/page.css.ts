import { style } from "@vanilla-extract/css";

export const pageClass = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const textareaClass = style({
  border: "1px solid #e0e0e0",
  borderRadius: 8,
  fontSize: 14,
  lineHeight: 1.5,
  minHeight: 120,
  outline: "none",
  padding: 12,
  resize: "vertical",
  width: "100%",
});

export const columnsGridClass = style({
  display: "grid",
  gap: 16,
  gridTemplateColumns: "1fr 1fr",
});
