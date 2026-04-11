import { css } from "@/theme";

export const wrapperClass = css({
  height: 96,
  marginBottom: 50,
  marginInline: "auto",
  width: 98,
});

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
  maxWidth: 98,
});
