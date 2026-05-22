import { css, cssVariant } from "@/theme";

export const wrapperClass = css({
  marginTop: 20,
});

export const labelClass = css(({ fonts }) => ({
  fontSize: 17,
  fontWeight: fonts.demi,
  marginBottom: 8,
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
