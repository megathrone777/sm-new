import { css } from "@/theme";

export const wrapperClass = css({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 15,
});

export const contentClass = css({
  alignItems: "center",
  columnGap: 10,
  display: "flex",
  justifyContent: "flex-end",
});

export const titleClass = css(({ colors }) => ({
  color: "white",
  fontSize: 19,

  selectors: {
    "&.primary": { color: colors.greenLighter },
    "&.secondary": { color: colors.yellow },
  },
}));

export const deleteButtonClass = css({
  appearance: "none",
  background: "transparent",
  border: "none",
  color: "white",
  cursor: "pointer",
  fontSize: 18,
  padding: 4,

  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },
});
