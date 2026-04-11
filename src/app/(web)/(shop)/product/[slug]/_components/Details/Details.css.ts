import { css } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
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

export const layoutClass = css(({ devices }) => ({
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

export const modifiersHeadingClass = css({
  marginBottom: 15,
});

export const modifiersTitleClass = css(({ fonts }) => ({
  color: "black",
  fontSize: 17,
  fontWeight: fonts.medium,
  marginRight: 10,
}));

export const imageHolderClass = css(({ devices }) => ({
  borderRadius: 15,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
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

export const imageClass = css({
  height: "auto",
  objectFit: "cover",
  verticalAlign: "middle",
  width: "100%",
});

export const contentClass = css({
  marginBottom: 40,
});

export const titleClass = css(({ devices, fonts }) => ({
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

export const itemClass = css({
  marginBottom: 15,
  maxWidth: 450,
});

export const itemPriceClass = css(({ colors, fonts }) => ({
  color: colors.red,
  fontSize: 20,
  fontWeight: fonts.medium,
  marginBottom: 20,
}));

export const itemTitleClass = css(({ fonts }) => ({
  color: "black",
  fontSize: 17,
  fontWeight: fonts.medium,
  marginRight: 10,
}));

export const placeholderClass = css(({ colors }) => ({
  color: colors.red,
  fontSize: 20,
}));
