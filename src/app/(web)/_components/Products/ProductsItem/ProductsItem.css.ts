import { css } from "@/theme";

export const imageHolderClass = css(({ devices }) => ({
  borderRadius: 15,
  height: 260,
  marginBottom: 20,
  maxWidth: 180,
  overflow: "hidden",
  position: "relative",
  textAlign: "center",

  "@media": {
    [devices.mobile]: {
      height: 280,
      marginBottom: 0,
    },
  },
}));

export const imageClass = css(({ easing }) => ({
  height: "100%",
  objectFit: "cover",
  transition: `transform 0.5s ${easing}`,
  width: "100%",

  ":hover": {
    transform: "scale(1.05)",
  },
}));
