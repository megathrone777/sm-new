import { css } from "@/theme";

export const buttonClass = css({
  alignItems: "center",
  background: "none",
  border: "2px solid currentColor",
  borderRadius: "50%",
  color: "inherit",
  display: "grid",
  height: 22,
  justifyContent: "center",
  minWidth: 22,
  padding: 0,
  userSelect: "none",
  width: 22,

  ":hover": {
    opacity: 0.8,
  },
});

export const iconClass = css({
  width: 14,
});
