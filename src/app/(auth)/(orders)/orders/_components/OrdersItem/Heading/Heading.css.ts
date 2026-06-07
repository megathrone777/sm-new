import { style } from "@/theme";

export const wrapperClass = style({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 15,
});

export const contentClass = style({
  alignItems: "center",
  columnGap: 10,
  display: "flex",
  justifyContent: "flex-end",
});

export const titleClass = style(({ colors }) => ({
  color: "white",
  fontSize: 19,

  selectors: {
    "&.primary": { color: colors.greenLighter },
    "&.secondary": { color: colors.yellow },
  },
}));

export const deleteButtonClass = style({
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
