import { style } from "@/theme";

export const listClass = style({
  alignContent: "center",
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "row",
  marginBottom: 30,
  rowGap: 30,
});

export const itemClass = style({
  borderBottom: "1px solid #eee",
  paddingBottom: 16,
});

export const rowClass = style({
  alignContent: "center",
  alignItems: "center",
  columnGap: 30,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr 1fr auto",
  justifyContent: "start",
});

export const editFormClass = style({
  alignContent: "center",
  alignItems: "center",
  columnGap: 15,
  display: "grid",
  gridAutoFlow: "column",
});

export const editFormLayoutClass = style({
  alignContent: "center",
  alignItems: "center",
  display: "grid",
  gap: "10px 30px",
  gridAutoFlow: "column",
});

export const activateFormClass = style({
  alignItems: "center",
  columnGap: 15,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "max-content 1fr",
});

export const activateFormLayoutClass = style({
  alignItems: "center",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
});

export const codeClass = style(({ fonts }) => ({
  fontWeight: fonts.bold,
  paddingBottom: 8,
  whiteSpace: "nowrap",
}));

export const statusClass = style({
  alignSelf: "end",
  fontSize: 12,
  paddingBottom: 10,
  whiteSpace: "nowrap",
});

export const activeBadgeClass = style(({ colors }) => ({
  backgroundColor: colors.greenLightest,
  borderRadius: 4,
  color: colors.greenDarker,
  padding: "2px 6px",
}));

export const pendingBadgeClass = style(({ colors }) => ({
  backgroundColor: colors.yellowLightest,
  borderRadius: 4,
  color: colors.orangeDarkest,
  padding: "2px 6px",
}));

export const inactiveBadgeClass = style(({ colors }) => ({
  backgroundColor: colors.redLightest,
  borderRadius: 4,
  color: colors.redDarkest,
  padding: "2px 6px",
}));

export const linkClass = style({
  display: "inline-block",
  height: 38,
});
