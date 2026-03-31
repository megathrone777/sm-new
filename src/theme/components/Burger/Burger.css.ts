import { cssVariants } from "@/theme";

export const buttonClass = cssVariants(
  {
    default: "rotate(0deg)",
    isOpened: "rotate(-45deg)",
  },

  (transform) => [
    {
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      height: 35,
      justifyContent: "space-between",
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
      transform: "none",
      transformOrigin: "right",
      width: "50%",
    },
    leftOpened: {
      alignSelf: "auto",
      isOpened: true,
      transform: "rotate(-90deg) translateX(3px)",
      transformOrigin: "right",
      width: "50%",
    },
    middle: {
      alignSelf: "auto",
      isOpened: false,
      transform: "none",
      transformOrigin: "none",
      width: "100%",
    },
    middleOpened: {
      alignSelf: "auto",
      isOpened: true,
      transform: "none",
      transformOrigin: "none",
      width: "100%",
    },
    right: {
      alignSelf: "flex-end",
      isOpened: false,
      transform: "none",
      transformOrigin: "left",
      width: "50%",
    },
    rightOpened: {
      alignSelf: "flex-end",
      isOpened: true,
      transform: "rotate(-90deg) translateX(-3px)",
      transformOrigin: "left",
      width: "50%",
    },
  },
  ({ alignSelf, isOpened, transform, transformOrigin, width }, { colors }) => ({
    alignSelf,
    backgroundColor: isOpened ? colors.red : "white",
    borderRadius: 5,
    height: 4,
    opacity: 0.9,
    transform,
    transformOrigin,
    transition: "transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57)",
    width,
  }),
);
