import { css, cssVariants } from "@/theme";

export const wrapperClass = css({
  alignContent: "end",
  bottom: 0,
  display: "grid",
  height: 0,
  overflow: "hidden",
  position: "sticky",
  width: "100%",
  zIndex: 202,
});

export const overlayClass = cssVariants(
  ({ animations, easing }) => ({
    default: {
      opacity: 0,
      pointerEvents: "none",
    },
    isOpened: {
      animation: `${animations.fadeIn} .35s ${easing}`,
    },
  }),
  (state) => [
    {
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, .7)",
      cursor: "pointer",
      display: "grid",
      height: "100dvh",
      justifyContent: "center",
      width: "100%",
    },
    state,
  ],
);

export const layoutClass = css({
  background: "url('/images/modal_bg.jpg') center center / cover no-repeat",
  borderRadius: 15,
  cursor: "default",
  minWidth: 600,
  position: "relative",
  zIndex: 203,
});

export const headerClass = css({
  alignItems: "center",
  display: "grid",
  height: 60,
  justifyContent: "end",
  paddingRight: 15,
});

export const closeButtonClass = css({
  backgroundColor: "transparent",
  border: "none",
  color: "white",
  height: 30,
  padding: 0,
  width: 30,

  ":focus": {
    outline: "none",
  },
});
