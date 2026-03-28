import { css } from "@/theme";

export const wrapperClass = css({
  height: 125,
  insetInline: 0,
  position: "absolute",
  top: 0,
  zIndex: 10,

  // [devices.tablet]: {
  //   height: rem(100),
  // },
});

export const layoutClass = css({
  alignItems: "center",
  display: "flex",
  height: "100%",

  // [devices.tablet]: {
  //   justifyContent: "space-between",
  // },
});

// export const StyledContent = styled(StyledLayout)(({ theme: { devices } }) => ({
//   flexGrow: 1,

//   "&.is-opened": {
//     opacity: 1,
//     visibility: "visible",
//   },

//   [devices.tablet]: {
//     background: 'url("/images/products_bg.jpg") center center/cover no-repeat',
//     bottom: 0,
//     flexDirection: "column-reverse",
//     left: 0,
//     opacity: 0,
//     position: "fixed",
//     right: 0,
//     justifyContent: "center",
//     top: 0,
//     transition: "visibility 0.2s ease-in, opacity 0.2s ease-in",
//     visibility: "hidden",
//     zIndex: 10,
//   },
// }));
