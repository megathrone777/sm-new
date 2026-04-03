import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  transform: "translateY(-7px)",
  width: 72,
  zIndex: 40,

  "@media": {
    [devices.mobile]: {
      transform: "translateY(-10px)",
      width: 82,
    },

    [devices.desktop]: {
      transform: "translateY(15px)",
      width: 98,
    },
  },
}));

export const linkClass = css({
  cursor: "pointer",
  display: "block",
  height: "100%",
  position: "relative",

  ":focus": {
    outline: "none",
  },
});

export const imageClass = css({
  maxWidth: "100%",
});
