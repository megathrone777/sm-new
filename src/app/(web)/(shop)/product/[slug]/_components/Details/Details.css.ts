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
  display: "grid",
  gridAutoFlow: "column",

  "@media": {
    [devices.tablet]: {
      gridAutoFlow: "row",
      marginInline: "auto",
      maxWidth: 1200,
    },
  },
}));

const columnClass = css(({ devices }) => ({
  marginInline: 10,
  position: "relative",

  "@media": {
    [devices.mobile]: {
      marginInline: 20,
    },
  },
}));

export const columnLeftClass = css(({ devices }) => [
  columnClass,
  {
    position: "relative",

    "@media": {
      [devices.tablet]: {
        maxWidth: "50%",
      },
    },
  },
]);

export const columnRightClass = css(({ devices }) => [
  columnClass,
  {
    position: "relative",

    "@media": {
      [devices.tablet]: {
        maxWidth: "50%",
      },
    },
  },
]);

// export const columnLeftClass = css(({ theme: { devices, rem } }) => ({
//   flex: "0 1 35%",
//   maxWidth: "35%",
//   position: "relative",

//   [devices.mobile]: {
//     flex: "0 1 auto",
//     marginBottom: rem(30),
//     maxWidth: "50%",
//   },

//   [devices.mobileSm]: {
//     maxWidth: "100%",
//   },
// }));

// export const StyledContentRight = styled(StyledContentColumn)(({ theme: { devices } }) => ({
//   flex: "0 1 65%",
//   maxWidth: "65%",

//   [devices.mobile]: {
//     flex: "0 1 auto",
//     maxWidth: "100%",
//   },
// }));

export const imageHolderClass = css({
  borderRadius: 15,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
  overflow: "hidden",
});

export const imageClass = css({
  objectFit: "cover",
  verticalAlign: "middle",
});

export const contentClass = css({
  marginBottom: 40,
});

export const titleClass = css(({ fonts }) => ({
  fontSize: 40,
  fontWeight: fonts.medium,
  marginBottom: 20,
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

export const buttonsLayoutClass = css(({ devices }) => ({
  textAlign: "right",

  "@media": {
    [devices.mobile]: {
      textAlign: "center",
    },
  },
}));

export const totalPriceClass = css(({ colors, fonts }) => ({
  color: colors.red,
  fontSize: 22,
  fontWeight: fonts.medium,
  marginBottom: 20,
  paddingTop: 15,
}));

export const totalTitleClass = css(({ fonts }) => ({
  color: "black",
  fontSize: 24,
  fontWeight: fonts.medium,
  marginRight: 10,
}));
