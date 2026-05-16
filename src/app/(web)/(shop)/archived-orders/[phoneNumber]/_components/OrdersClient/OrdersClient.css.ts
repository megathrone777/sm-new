import { css, cssVariant } from "@/theme";

export const controlsClass = css({
  marginBottom: 16,
});

export const listClass = css(({ colors }) => ({
  border: `1px solid ${colors.white}`,
  borderRadius: 10,
  overflow: "hidden",
}));

export const rowClass = css(({ colors, devices }) => ({
  alignItems: "center",
  borderBottom: `1px solid ${colors.white}`,
  columnGap: 12,
  display: "grid",
  gridTemplateAreas: `
    "date actions"
    "id actions"
    "price status"
    "invoice images"
  `,
  gridTemplateColumns: "1fr auto",
  padding: "14px 16px",
  rowGap: 6,
  selectors: {
    "&:last-child": {
      borderBottom: "none",
    },
  },

  "@media": {
    [devices.tablet]: {
      columnGap: 16,
      gridTemplateAreas: "'date id price status invoice images actions'",
      gridTemplateColumns: "90px 100px 80px 100px 1fr 160px auto",
      rowGap: 0,
    },
  },
}));

export const dateClass = css(({ colors, fonts }) => ({
  color: colors.gray,
  fontSize: 15,
  fontWeight: fonts.medium,
  gridArea: "date",
}));

export const orderIdClass = css(({ devices, fonts }) => ({
  alignItems: "center",
  display: "flex",
  fontSize: 15,
  fontWeight: fonts.bold,
  gap: 6,
  gridArea: "id",

  "@media": {
    [devices.tablet]: {
      justifyContent: "flex-start",
    },
  },
}));

export const copyButtonClass = css(({ colors, easing, fonts }) => ({
  alignItems: "center",
  background: "none",
  border: "none",
  borderRadius: 4,
  color: colors.gray,
  cursor: "pointer",
  display: "flex",
  fontSize: 16,
  fontWeight: fonts.medium,
  lineHeight: 1,
  padding: "2px 4px",
  transition: `color .15s ${easing}`,

  ":hover": {
    color: colors.red,
  },
}));

export const priceClass = css(({ colors, fonts }) => ({
  color: colors.red,
  fontSize: 17,
  fontWeight: fonts.demi,
  gridArea: "price",
}));

export const statusClass = cssVariant(
  ({ colors }) => ({
    cancelled: {
      backgroundColor: `${colors.red}1a`,
      color: colors.red,
    },
    done: {
      backgroundColor: `${colors.greenLighter}1a`,
      color: colors.greenLighter,
    },
    processing: {
      backgroundColor: `${colors.gray}1a`,
      color: colors.gray,
    },
  }),
  (colorStyle, { fonts }) => [
    {
      borderRadius: 4,
      fontSize: 16,
      fontWeight: fonts.medium,
      gridArea: "status",
      justifySelf: "start",
      padding: "2px 8px",
    },
    colorStyle,
  ],
);

export const invoiceAreaClass = css({
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  gridArea: "invoice",
});

export const invoiceLinkClass = css(({ colors, fonts }) => ({
  alignItems: "center",
  color: colors.red,
  columnGap: 4,
  display: "inline-flex",
  fontSize: 15,
  fontWeight: fonts.medium,
  textDecoration: "none",
  whiteSpace: "nowrap",

  ":hover": {
    textDecoration: "underline",
  },
}));

export const iconClass = css({
  display: "inline-block",
  height: 20,
});

export const actionsClass = css(({ devices }) => ({
  display: "flex",
  gap: 6,
  gridArea: "actions",

  "@media": {
    [devices.tablet]: {
      justifyContent: "flex-end",
    },
  },
}));

export const repeatClass = css({
  alignItems: "center",
  columnGap: 6,
  display: "inline-grid",
  gridAutoFlow: "column",
});

export const imagesClass = css(({ devices }) => ({
  alignItems: "center",
  display: "flex",
  gap: 4,
  gridArea: "images",
  justifyContent: "flex-end",

  "@media": {
    [devices.tablet]: {
      justifyContent: "flex-end",
    },
  },
}));

export const imageWrapperClass = css({
  borderRadius: 6,
  flexShrink: 0,
  height: 60,
  overflow: "hidden",
  position: "relative",
  width: 44,
});

export const imageClass = css({
  objectFit: "cover",
});

export const moreImagesClass = css(({ colors, fonts }) => ({
  alignItems: "center",
  backgroundColor: colors.white,
  borderRadius: 6,
  color: colors.grayDarker,
  display: "flex",
  fontSize: 14,
  fontWeight: fonts.demi,
  height: 60,
  justifyContent: "center",
  minWidth: 32,
  padding: "0 4px",
}));
