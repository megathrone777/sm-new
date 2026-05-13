import { css } from "@/theme";

export const buttonClass = css(({ colors }) => ({
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
    "&.started": { backgroundColor: "#3b82f6" },
    "&.took": { backgroundColor: colors.yellow },
  },
  textTransform: "uppercase",
  width: "100%",

  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },
}));

export const layoutClass = css({
  columnGap: 15,
  display: "flex",
  marginBottom: 15,

  selectors: {
    "&.no-button": { justifyContent: "flex-end" },
  },
});

export const statusClass = css(({ colors }) => ({
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
