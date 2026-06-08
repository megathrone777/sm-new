import { rgba, style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  display: "grid",
  gap: 9,
  gridTemplateColumns: "1fr 1fr",

  "@media": {
    [devices.tablet]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
}));

export const buttonClass = style(({ colors, fonts }) => ({
  alignContent: "center",
  alignItems: "center",
  backgroundColor: rgba(colors.whiteLightest, 0.043),
  border: `1px solid ${rgba(colors.whiteLightest, 0.12)}`,
  borderRadius: 999,
  color: rgba(colors.whiteLightest, 0.84),
  columnGap: 10,
  cursor: "pointer",
  display: "inline-grid",
  fontSize: 14,
  fontWeight: fonts.demi,
  gridAutoFlow: "column",
  height: 38,
  justifyContent: "center",
  paddingInline: 12,
  transition: "background-color .2s, border-color .2s",
  whiteSpace: "nowrap",

  ":hover": {
    backgroundColor: rgba(colors.whiteLightest, 0.07),
    borderColor: rgba(colors.whiteLightest, 0.24),
  },
}));

export const iconClass = style({
  height: 13,
});

export const diamondClass = style(({ colors }) => ({
  backgroundColor: colors.red,
  borderRadius: 1,
  display: "inline-block",
  height: 8,
  transform: "rotate(45deg)",
  verticalAlign: "middle",
  width: 8,
}));

export const circleClass = style(({ colors }) => ({
  border: `1px solid ${colors.greenLighter}`,
  borderRadius: "50%",
  display: "inline-block",
  height: 9,
  width: 9,
}));
