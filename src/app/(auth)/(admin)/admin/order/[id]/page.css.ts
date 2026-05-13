import { css } from "@/theme";

export const formClass = css({
  alignItems: "start",
  display: "grid",
  gap: 20,
  gridTemplateColumns: "repeat(2, 1fr)",
});

export const deleteWrapperClass = css({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 24,
});
