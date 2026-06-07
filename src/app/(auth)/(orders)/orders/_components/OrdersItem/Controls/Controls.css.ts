import { style } from "@/theme";

export const buttonClass = style(({ colors }) => ({
  appearance: "none",
  backgroundColor: colors.greenLighter,
  border: "none",
  borderRadius: 4,
  color: "white",
  cursor: "pointer",
  display: "block",
  fontFamily: "inherit",
  fontSize: 19,
  height: 45,
  selectors: {
    "&.done": { backgroundColor: "gray" },
    "&.new": { backgroundColor: "red" },
    "&.ready": { backgroundColor: colors.greenLighter },
    "&.started": { backgroundColor: colors.blue },
    "&.took": { backgroundColor: colors.yellow },
  },
  textTransform: "uppercase",
  width: "100%",

  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },
}));

export const layoutClass = style({
  columnGap: 15,
  display: "flex",
  marginBottom: 15,
  selectors: {
    "&.no-button": { justifyContent: "flex-end" },
  },
});

export const statusClass = style(({ colors }) => ({
  alignItems: "center",
  borderRadius: 4,
  display: "flex",
  height: 45,
  justifyContent: "center",
  minWidth: 45,
  selectors: {
    "&.alert": { backgroundColor: "red" },
    "&.default": { backgroundColor: colors.greenLighter },
    "&.warning": { backgroundColor: "orange" },
  },
  width: 45,
}));
