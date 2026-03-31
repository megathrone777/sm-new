import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  translate: "0 -7px",
  width: 72,
  zIndex: 40,

  "@media": {
    [devices.mobile]: {
      translate: "0 -10px",
      width: 82,
    },

    [devices.desktopLg]: {
      translate: "0 -6px",
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
