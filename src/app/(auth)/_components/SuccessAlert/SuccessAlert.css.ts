import { css } from "@/theme";

export const wrapperClass = css({
  alignItems: "start",
  display: "grid",
  height: 0,
  justifyContent: "center",
  position: "sticky",
  top: 90,
  zIndex: 100,
});

export const layoutClass = css(({ animations, colors, easing, fonts }) => ({
  animation: `${animations.fadeOut} 3s ${easing} forwards`,
  backgroundColor: colors.greenLighter,
  borderRadius: 6,
  color: "white",
  fontWeight: fonts.demi,
  marginInline: "auto",
  maxWidth: 350,
  padding: "10px 16px",
}));
