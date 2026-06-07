import { style } from "@/theme";

export const pageClass = style(({ fonts }) => ({
  backgroundColor: "white",
  color: "black",
  fontSize: 15,
  fontWeight: fonts.medium,
  minHeight: "100dvh",
  paddingBlock: 40,
  paddingInline: 40,
}));

export const printBarClass = style({
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

export const headerClass = style({
  alignItems: "flex-start",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  marginBottom: 24,
});

export const invoiceTitleClass = style({
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 4,
  textAlign: "right",
});

export const invoiceSubtitleClass = style(({ colors }) => ({
  color: colors.grayDarkest,
  fontSize: 11,
  textAlign: "right",
}));

export const labelClass = style({
  fontWeight: "bold",
  marginBottom: 6,
});

export const partyGridClass = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  marginBottom: 24,
});

export const partyClass = style({
  lineHeight: 1.7,
});

export const metaGridClass = style({
  borderBottom: "1px solid #ddd",
  borderTop: "1px solid #ddd",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  marginBottom: 24,
  paddingBlock: 10,
});

export const metaKeyClass = style(({ colors }) => ({
  color: colors.grayDarkest,
  display: "inline-block",
  fontStyle: "italic",
  marginRight: 4,
  minWidth: 140,
}));

export const tableClass = style({
  borderCollapse: "collapse",
  marginBottom: 24,
  width: "100%",
});

export const theadClass = style(({ colors }) => ({
  backgroundColor: colors.whiteLighter,
  borderBottom: "2px solid #333",
}));

export const thClass = style({
  fontSize: 11,
  padding: "6px 8px",
  textAlign: "left",
  whiteSpace: "nowrap",
});

export const thRightClass = style({
  fontSize: 11,
  padding: "6px 8px",
  textAlign: "right",
  whiteSpace: "nowrap",
});

export const tdClass = style({
  borderBottom: "1px solid #eee",
  padding: "6px 8px",
  verticalAlign: "top",
});

export const tdRightClass = style({
  borderBottom: "1px solid #eee",
  padding: "6px 8px",
  textAlign: "right",
  verticalAlign: "top",
});

export const totalRowClass = style({
  borderTop: "2px solid #333",
});

export const totalLabelClass = style({
  fontWeight: "bold",
  padding: "8px",
  textAlign: "right",
});

export const totalAmountClass = style({
  fontSize: 15,
  fontWeight: "bold",
  padding: "8px",
  textAlign: "right",
});

export const footerClass = style(({ colors }) => ({
  color: colors.grayDarkest,
  fontSize: 10,
  marginTop: 40,
  textAlign: "center",
}));
