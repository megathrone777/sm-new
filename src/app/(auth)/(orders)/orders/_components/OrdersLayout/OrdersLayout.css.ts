import { css } from "@/theme";

export const listClass = css({
  alignItems: "start",
  display: "grid",
  gap: 10,
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
});
