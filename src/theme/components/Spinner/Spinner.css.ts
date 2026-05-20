import { keyframes } from "@vanilla-extract/css";

import { cssVariant } from "@/theme";

const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },

  "100%": {
    transform: "rotate(360deg)",
  },
});

export const wrapperClass = cssVariant(
  {
    normal: {
      borderWidth: 8,
      height: 50,
      width: 50,
    },
    small: {
      borderWidth: 4,
      height: 22,
      width: 22,
    },
  },
  (template) => [
    {
      animationDuration: ".5s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
      borderRadius: "50%",
      borderStyle: "solid",
    },
    template,
  ],
);
