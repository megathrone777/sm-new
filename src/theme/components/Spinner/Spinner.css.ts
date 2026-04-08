import { keyframes } from "@vanilla-extract/css";

import { cssVariants } from "@/theme";

const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },

  "100%": {
    transform: "rotate(360deg)",
  },
});

export const wrapperClass = cssVariants(
  {
    normal: {
      borderWidth: 8,
      height: 50,
      width: 50,
    },
    small: {
      borderWidth: 4,
      height: 25,
      width: 25,
    },
  },
  (template) => [
    {
      animationDuration: "0.5s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
      borderRadius: "50%",
      borderStyle: "solid",
    },
    template,
  ],
);
