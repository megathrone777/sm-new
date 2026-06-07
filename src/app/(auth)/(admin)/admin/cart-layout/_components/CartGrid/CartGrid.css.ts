import { style } from "@/theme";

export const wrapperClass = style({
  paddingBlock: 24,
});

export const headerClass = style({
  alignItems: "center",
  columnGap: 16,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "space-between",
  marginBottom: 24,
});

export const spinnerClass = style({
  height: "100%",
  minWidth: 40,
});

export const titleClass = style(({ fonts }) => ({
  fontSize: 20,
  fontWeight: fonts.bold,
}));

export const actionsClass = style({
  alignItems: "center",
  columnGap: 12,
  display: "grid",
  gridAutoFlow: "column",
});

export const gridWrapperClass = style(({ colors }) => ({
  backgroundColor: colors.whiteLighter,
  borderRadius: 8,
  padding: 16,
  width: "100%",
}));

export const blockClass = style(({ colors, fonts }) => ({
  alignItems: "center",
  backgroundColor: "white",
  border: `3px solid ${colors.red}`,
  borderRadius: 6,
  boxSizing: "border-box",
  cursor: "grab",
  display: "grid",
  fontSize: 14,
  fontWeight: fonts.bold,
  gap: 4,
  gridAutoFlow: "row",
  justifyContent: "center",
  padding: 8,
  textAlign: "center",
  userSelect: "none",
}));

export const blockLabelClass = style(({ colors, fonts }) => ({
  color: colors.black,
  fontSize: 17,
  fontWeight: fonts.bold,
}));

export const hintClass = style(({ colors }) => ({
  color: colors.gray,
  fontSize: 15,
  marginTop: 12,
}));
