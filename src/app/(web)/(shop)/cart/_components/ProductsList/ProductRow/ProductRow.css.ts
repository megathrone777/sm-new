import { css } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
  border: `1px solid ${colors.white}`,
  borderRadius: 7,
  boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.5)",

  "@media": {
    [devices.mobile]: {
      display: "grid",
    },
  },
}));

export const layoutClass = css(({ colors }) => ({
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
}));

export const heroClass = css({
  textAlign: "center",
});

export const imageHolderClass = css({
  borderRadius: 10,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
  display: "inline-block",
  overflow: "hidden",
});

export const imageClass = css({
  height: 112,
  width: "auto",
});

export const linkClass = css(({ colors, fonts }) => ({
  color: "black",
  fontWeight: fonts.medium,
  position: "relative",
  textDecoration: "none",

  ":hover": {
    color: colors.red,
  },
}));

export const titleClass = css(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.bold,
}));

export const weightClass = css(({ devices }) => ({
  marginBottom: 0,

  "@media": {
    [devices.mobile]: {
      marginBottom: 10,
    },
  },
}));

export const modifierClass = css({
  fontSize: 14,
});

export const subModifierClass = css({
  fontSize: 12,
});
