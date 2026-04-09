import { css } from "@/theme";

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  marginBottom: 30,
  rowGap: 24,
});

export const itemClass = css({
  borderBottom: "1px solid #eee",
  paddingBottom: 16,
});

export const rowClass = css({
  alignItems: "end",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
});

export const editFormClass = css({
  alignItems: "end",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "max-content 80px max-content 1fr",
});

export const activateFormClass = css({
  alignItems: "end",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "max-content 1fr",
  marginTop: 8,
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

export const ordersClass = css({
  color: "#555",
  fontSize: 13,
  marginTop: 8,
});
