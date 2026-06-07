import { rgba, style } from "@/theme";

export const wrapperClass = style(({ colors, devices }) => ({
  backgroundImage: "url('/images/products_bg.jpg')",
  backgroundSize: "33.3333% auto",
  borderBottom: `4px solid ${colors.red}`,
  overflow: "hidden",
  paddingBottom: 50,
  paddingTop: 20,

  "@media": {
    [devices.tablet]: {
      paddingBottom: 100,
      paddingTop: 50,
    },
  },
}));

export const layoutClass = style(({ devices }) => ({
  alignItems: "start",
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 30,
  width: "100%",

  "@media": {
    [devices.tablet]: {
      columnGap: 40,
      gridAutoFlow: "column",
      gridTemplateColumns: "35% 1fr",
      marginInline: "auto",
      maxWidth: 1200,
    },
  },
}));

export const modifiersHeadingClass = style({
  marginBottom: 15,
});

export const modifiersTitleClass = style(({ fonts }) => ({
  color: "black",
  fontSize: 17,
  fontWeight: fonts.medium,
  marginRight: 10,
}));

export const imageHolderClass = style(({ colors, devices }) => ({
  backgroundColor: colors.black,
  borderRadius: 15,
  boxShadow: `0 0 10px 0 ${rgba(colors.black, 0.5)}`,
  overflow: "hidden",
  position: "relative",

  "@media": {
    [devices.mobile]: {
      maxWidth: 380,
    },

    [devices.tablet]: {
      maxWidth: "none",
    },
  },
}));

export const imageClass = style({
  height: "auto",
  objectFit: "cover",
  verticalAlign: "middle",
  width: "100%",
});

export const contentClass = style({
  marginBottom: 40,
});

export const titleClass = style(({ devices, fonts }) => ({
  fontSize: 36,
  fontWeight: fonts.medium,
  marginBottom: 10,

  "@media": {
    [devices.tablet]: {
      fontSize: 40,
      marginBottom: 20,
    },
  },
}));

export const itemClass = style({
  marginBottom: 15,
  maxWidth: 450,
});

export const itemPriceClass = style(({ colors, fonts }) => ({
  color: colors.red,
  fontSize: 20,
  fontWeight: fonts.medium,
  marginBottom: 20,
}));

export const itemTitleClass = style(({ fonts }) => ({
  color: "black",
  fontSize: 17,
  fontWeight: fonts.medium,
  marginRight: 10,
}));

export const placeholderClass = style(({ colors }) => ({
  color: colors.red,
  fontSize: 20,
}));
