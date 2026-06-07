import { rgba, style } from "@/theme";

export const wrapperClass = style(({ colors, devices }) => ({
  border: `1px solid ${colors.white}`,
  borderRadius: 7,
  boxShadow: `0 0 5px 0 ${rgba(colors.black, 0.5)}`,

  "@media": {
    [devices.mobile]: {
      display: "grid",
    },

    [devices.tablet]: {
      border: "none",
      boxShadow: "none",
      gridAutoFlow: "column",
      gridTemplateColumns: "1fr 1fr",
    },
  },
}));

export const layoutClass = style(({ colors, devices }) => ({
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr 1fr",
  justifyItems: "center",
  paddingBlock: 15,
  paddingInline: 8,

  ":last-of-type": {
    backgroundColor: colors.white,
  },

  "@media": {
    [devices.tablet]: {
      ":last-of-type": {
        backgroundColor: "transparent",
      },
    },
  },
}));

export const heroClass = style({
  textAlign: "center",
});

export const imageHolderClass = style(({ colors }) => ({
  borderRadius: 10,
  boxShadow: `0 0 10px 0 ${rgba(colors.black, 0.5)}`,
  display: "inline-block",
  overflow: "hidden",
}));

export const imageClass = style({
  height: 112,
  width: "auto",
});

export const linkClass = style(({ colors, fonts }) => ({
  color: "black",
  fontWeight: fonts.medium,
  position: "relative",
  textDecoration: "none",

  ":hover": {
    color: colors.red,
  },
}));

export const titleClass = style(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.bold,
}));

export const weightClass = style({
  marginBottom: 8,
});

export const modifierClass = style({
  fontSize: 14,
  lineHeight: 1.1,
  marginBottom: 6,
});

export const modifierTitleClass = style({
  display: "block",
});

export const subModifierClass = style({
  fontSize: 12,
  lineHeight: 1,
});
