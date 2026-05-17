import { css } from "@/theme";

export const pageClass = css({
  display: "flex",
  flexDirection: "column",
  gap: 30,
});

export const textareaClass = css({
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

export const columnsGridClass = css({
  display: "grid",
  gap: 30,
  gridAutoFlow: "column",
  gridTemplateColumns: "40% 40%",
  width: "100%",
});
