import { css, cssVariant } from "@/theme";

export const wrapperClass = css({
  alignContent: "end",
  bottom: 0,
  display: "grid",
  height: 0,
  position: "sticky",
  width: "100%",
  zIndex: 202,
});

export const overlayClass = cssVariant(
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

export const layoutClass = css(({ devices }) => ({
  background: "url('/images/modal_bg.jpg') center center / cover no-repeat",
  borderRadius: 15,
  cursor: "default",
  maxWidth: 600,
  overflow: "hidden",
  paddingBottom: 60,
  paddingInline: 20,
  position: "relative",
  textAlign: "center",
  width: "100%",
  zIndex: 203,

  "@media": {
    [devices.tablet]: {
      minWidth: 600,
    },
  },
}));

export const headerClass = css({
  alignItems: "center",
  display: "grid",
  height: 60,
  justifyContent: "end",
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

export const titleClass = css(({ devices, fonts }) => ({
  color: "white",
  fontSize: 26,
  fontWeight: fonts.medium,
  marginBottom: 13,
  paddingInline: 10,

  "@media": {
    [devices.mobile]: {
      fontSize: 30,
    },
  },
}));

export const scheduleClass = css(({ fonts }) => ({
  color: "white",
  fontSize: 20,
  fontWeight: fonts.medium,
  marginBottom: 25,
}));

export const contactClass = css({
  paddingBottom: 25,
  paddingInline: 8,
});

export const statusClass = cssVariant(
  ({ colors }) => ({
    offline: {
      color: colors.red,
    },

    online: {
      color: "green",
    },
  }),

  (status, { devices, fonts }) => [
    {
      fontSize: 20,
      fontWeight: fonts.medium,

      "@media": {
        [devices.mobile]: {
          fontSize: 24,
        },
      },
    },
    status,
  ],
);
