import { keyframes } from "@vanilla-extract/css";

const animations = {
  fadeIn: keyframes({
    from: {
      opacity: 0,
      pointerEvents: "none",
    },

    to: {
      opacity: 1,
      pointerEvents: "auto",
    },
  }),

  fadeInUp: keyframes({
    from: {
      opacity: 0,
      pointerEvents: "none",
      transform: "translate3d(0, 15px, 0)",
    },

    to: {
      opacity: 1,
      pointerEvents: "auto",
      transform: "translate3d(0, 0, 0)",
    },
  }),

  fadeOut: keyframes({
    "0%": { opacity: 1 },
    "80%": { opacity: 1 },
    "100%": { opacity: 0, visibility: "hidden" },
  }),
};

export { animations };
