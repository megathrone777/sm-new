import { style } from "@/theme";

export const listClass = style({
  alignContent: "start",
  alignItems: "stretch",
  display: "grid",
  gap: 10,
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
});
