import { css } from "@/theme";

export const listClass = css({
  alignContent: "center",
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "row",
  marginBottom: 30,
  rowGap: 30,
});

export const itemClass = css({
  borderBottom: "1px solid #eee",
  paddingBottom: 16,
});

export const rowClass = css({
  alignContent: "center",
  alignItems: "center",
  columnGap: 30,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr 1fr auto",
  justifyContent: "start",
});

export const editFormClass = css({
  alignContent: "center",
  alignItems: "center",
  columnGap: 15,
  display: "grid",
  gridAutoFlow: "column",
});

export const editFormLayoutClass = css({
  alignContent: "center",
  alignItems: "center",
  display: "grid",
  gap: "10px 30px",
  gridAutoFlow: "column",
});

export const activateFormClass = css({
  alignItems: "center",
  columnGap: 15,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "max-content 1fr",
});

export const activateFormLayoutClass = css({
  alignItems: "center",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
});

export const codeClass = css(({ fonts }) => ({
  fontWeight: fonts.bold,
  paddingBottom: 8,
  whiteSpace: "nowrap",
}));

export const statusClass = css({
  alignSelf: "end",
  fontSize: 12,
  paddingBottom: 10,
  whiteSpace: "nowrap",
});

export const activeBadgeClass = css({
  backgroundColor: "#dcfce7",
  borderRadius: 4,
  color: "#166534",
  padding: "2px 6px",
});

export const pendingBadgeClass = css({
  backgroundColor: "#fef9c3",
  borderRadius: 4,
  color: "#854d0e",
  padding: "2px 6px",
});

export const inactiveBadgeClass = css({
  backgroundColor: "#fee2e2",
  borderRadius: 4,
  color: "#991b1b",
  padding: "2px 6px",
});

export const linkClass = css({
  display: "inline-block",
  height: 38,
});
