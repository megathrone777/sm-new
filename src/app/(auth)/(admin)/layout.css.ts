import { css } from "@/theme";

export const layoutClass = css({
  alignItems: "start",
  display: "grid",
  gap: 30,
  gridAutoFlow: "column",
  gridTemplateColumns: "220px 1fr",
  justifyContent: "start",
});

export const contentClass = css({
  minHeight: 600,
  position: "relative",
});
