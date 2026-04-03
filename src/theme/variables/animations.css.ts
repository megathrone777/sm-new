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
};

export { animations };
