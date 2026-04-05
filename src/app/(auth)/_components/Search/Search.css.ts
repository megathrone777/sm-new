import { css } from "@/theme";

export const wrapperClass = css({
  position: "relative",
});

export const spinnerClass = css({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
});

export const resultsClass = css(({ animations, easing }) => ({
  animation: `${animations.fadeInUp} .35s ${easing} forwards`,
  backgroundColor: "white",
  borderRadius: "0 0 6px 6px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, .5)",
  opacity: 0,
  overflow: "hidden",
  padding: 5,
  position: "absolute",
  right: 0,
  top: "100%",
  transform: "translate3d(0, 15px, 0)",
}));
