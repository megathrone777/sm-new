import { style } from "@/theme";

export const wrapperClass = style({
  height: 96,
  marginBottom: 50,
  marginInline: "auto",
  width: 98,
});

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
