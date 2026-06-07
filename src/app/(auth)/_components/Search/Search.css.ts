import { rgba, style } from "@/theme";

export const wrapperClass = style({
  position: "relative",
});

export const spinnerClass = style({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
});

export const resultsClass = style(({ animations, colors, easing }) => ({
  animation: `${animations.fadeInUp} .35s ${easing} forwards`,
  backgroundColor: "white",
  borderRadius: "0 0 6px 6px",
  boxShadow: `0 2px 5px ${rgba(colors.black, 0.5)}`,
  opacity: 0,
  overflow: "hidden",
  padding: 5,
  position: "absolute",
  right: 0,
  top: "100%",
  transform: "translate3d(0, 15px, 0)",
}));
