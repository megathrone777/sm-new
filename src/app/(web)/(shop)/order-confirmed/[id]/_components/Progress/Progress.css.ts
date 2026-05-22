import { css, cssVariant } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  paddingTop: 10,
  rowGap: 10,
  textAlign: "center",
  width: "100%",

  "@media": {
    [devices.tablet]: {
      minWidth: 540,
    },
  },
}));

export const labelClass = css(({ colors, fonts }) => ({
  color: colors.greenLighter,
  fontSize: 18,
  fontWeight: fonts.demi,
}));

export const mapClass = cssVariant(
  {
    active: {
      filter: "none",
    },

    muted: {
      filter: "grayscale(1) brightness(1.3)",
    },
  },

  (state) => [
    {
      borderRadius: 5,
      height: 220,
      overflow: "hidden",
      position: "relative",
      width: "100%",
    },
    state,
  ],
);

export const markerClass = css(({ colors }) => ({
  background: "none",
  color: colors.amber,
  width: 17,
}));

export const courierMarkerClass = css(({ colors }) => ({
  background: "none",
  color: colors.amber,
}));
