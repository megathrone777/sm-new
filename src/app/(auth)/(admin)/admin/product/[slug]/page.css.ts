import { css } from "@/theme";

export const formLayoutClass = css({
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(2, 1fr)",
});

export const formFooterClass = css({
  display: "grid",
  justifyContent: "end",
});
