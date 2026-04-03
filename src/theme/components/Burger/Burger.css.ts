import { cssVariants } from "@/theme";

export const buttonClass = cssVariants(
  {
    default: "rotate(0deg)",
    isOpened: "rotate(-45deg)",
  },

  (transform) => [
    {
      alignItems: "start",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      display: "grid",
      gridAutoFlow: "row",
      height: 35,
      padding: 0,
      transition: "transform 330ms ease-out",
      width: 35,
    },
    {
      transform,
    },
  ],
);

export const lineClass = cssVariants(
  {
    left: {
      alignSelf: "auto",
      isOpened: false,
      justifySelf: "start",
      transform: "none",
      transformOrigin: "right",
      width: "50%",
    },
    leftOpened: {
      alignSelf: "auto",
      isOpened: true,
      justifySelf: "start",
      transform: "rotate(-90deg) translateX(3px)",
      transformOrigin: "right",
      width: "50%",
    },
    middle: {
      alignSelf: "center",
      isOpened: false,
      justifySelf: "auto",
      transform: "none",
      transformOrigin: "none",
      width: "100%",
    },
    middleOpened: {
      alignSelf: "center",
      isOpened: true,
      justifySelf: "auto",
      transform: "none",
      transformOrigin: "none",
      width: "100%",
    },
    right: {
      alignSelf: "end",
      isOpened: false,
      justifySelf: "end",
      transform: "none",
      transformOrigin: "left",
      width: "50%",
    },
    rightOpened: {
      alignSelf: "end",
      isOpened: true,
      justifySelf: "end",
      transform: "rotate(-90deg) translateX(-3px)",
      transformOrigin: "left",
      width: "50%",
    },
  },
  ({ alignSelf, isOpened, justifySelf, transform, transformOrigin, width }, { colors }) => ({
    alignSelf,
    backgroundColor: isOpened ? colors.red : "white",
    borderRadius: 5,
    height: 4,
    justifySelf,
    opacity: 0.9,
    transform,
    transformOrigin,
    transition: "transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57)",
    width,
  }),
);
