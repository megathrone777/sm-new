import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  alignContent: "stretch",
  display: "grid",
  minHeight: "100%",
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

export const linkClass = style({
  cursor: "pointer",
  display: "block",
  height: "100%",
  position: "relative",

  ":focus": {
    outline: "none",
  },
});

export const imageClass = style({
  height: "auto",
  width: "100%",
});
