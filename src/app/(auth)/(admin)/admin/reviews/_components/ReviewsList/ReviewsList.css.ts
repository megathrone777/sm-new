import { css } from "@/theme";

export const listClass = css({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const itemClass = css({
  border: "1px solid #eee",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 16,
});

export const itemHeaderClass = css({
  alignItems: "flex-start",
  display: "flex",
  gap: 16,
});

export const imageRowClass = css({
  display: "flex",
  flex: 1,
  flexWrap: "wrap",
  gap: 16,
});

export const itemFormClass = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

export const linkClass = css({
  flexShrink: 0,
  marginTop: 4,
});
