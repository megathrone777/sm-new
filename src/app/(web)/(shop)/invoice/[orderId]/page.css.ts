import { css } from "@/theme";

export const pageClass = css(({ fonts }) => ({
  backgroundColor: "white",
  color: "black",
  fontSize: 15,
  fontWeight: fonts.medium,
  minHeight: "100dvh",
  paddingBlock: 40,
  paddingInline: 40,
}));

export const printBarClass = css({
  alignItems: "center",
  display: "flex",
  gap: 10,
  justifyContent: "flex-end",
  marginBottom: 24,

  "@media": {
    print: {
      display: "none",
    },
  },
});

export const headerClass = css({
  alignItems: "flex-start",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  marginBottom: 24,
});

export const invoiceTitleClass = css({
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 4,
  textAlign: "right",
});

export const invoiceSubtitleClass = css({
  color: "#555",
  fontSize: 11,
  textAlign: "right",
});

export const labelClass = css({
  fontWeight: "bold",
  marginBottom: 6,
});

export const partyGridClass = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  marginBottom: 24,
});

export const partyClass = css({
  lineHeight: 1.7,
});

export const metaGridClass = css({
  borderBottom: "1px solid #ddd",
  borderTop: "1px solid #ddd",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  marginBottom: 24,
  paddingBlock: 10,
});

export const metaKeyClass = css({
  color: "#555",
  display: "inline-block",
  fontStyle: "italic",
  marginRight: 4,
  minWidth: 140,
});

export const tableClass = css({
  borderCollapse: "collapse",
  marginBottom: 24,
  width: "100%",
});

export const theadClass = css({
  backgroundColor: "#f5f5f5",
  borderBottom: "2px solid #333",
});

export const thClass = css({
  fontSize: 11,
  padding: "6px 8px",
  textAlign: "left",
  whiteSpace: "nowrap",
});

export const thRightClass = css({
  fontSize: 11,
  padding: "6px 8px",
  textAlign: "right",
  whiteSpace: "nowrap",
});

export const tdClass = css({
  borderBottom: "1px solid #eee",
  padding: "6px 8px",
  verticalAlign: "top",
});

export const tdRightClass = css({
  borderBottom: "1px solid #eee",
  padding: "6px 8px",
  textAlign: "right",
  verticalAlign: "top",
});

export const totalRowClass = css({
  borderTop: "2px solid #333",
});

export const totalLabelClass = css({
  fontWeight: "bold",
  padding: "8px",
  textAlign: "right",
});

export const totalAmountClass = css({
  fontSize: 15,
  fontWeight: "bold",
  padding: "8px",
  textAlign: "right",
});

export const footerClass = css({
  color: "#777",
  fontSize: 10,
  marginTop: 40,
  textAlign: "center",
});
