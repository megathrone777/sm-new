import { style } from "@/theme";

export const wrapperClass = style(({ colors }) => ({
  backgroundColor: colors.grayDarker,
  border: "4px solid white",
  borderRadius: 10,
  color: "white",
  display: "flex",
  flexDirection: "column",
  padding: 10,
  position: "relative",
  selectors: {
    "&.new": { borderColor: "red" },
    "&.new.time": { borderColor: "darkviolet" },
    "&.placed, &.done": { borderColor: "gray" },
    "&.ready": { borderColor: colors.greenLighter },
    "&.started": { borderColor: colors.blue },
    "&.took": { borderColor: colors.yellow },
  },
  width: "100%",
}));

export const noteClass = style({
  fontSize: 17,
  lineHeight: 1.3,
  marginBottom: 15,
  marginTop: -5,
  whiteSpace: "pre-line",
});

export const contentClass = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
});

export const itemClass = style({
  alignItems: "flex-start",
  display: "flex",
  fontSize: 17,
  marginBottom: 15,
  selectors: {
    "&.wrap": { flexWrap: "wrap" },
  },
});

export const labelClass = style({
  lineHeight: 1.2,
  marginRight: 4,
  whiteSpace: "nowrap",
});

export const valueClass = style(({ colors }) => ({
  fontSize: 18,
  lineHeight: 1.2,
  overflow: "hidden",
  selectors: {
    "&.normal": { fontSize: 17 },
    "&.primary": { color: colors.greenLighter },
    "&.secondary": { color: colors.yellow },
  },
  textOverflow: "ellipsis",
  whiteSpace: "break-spaces",
}));
