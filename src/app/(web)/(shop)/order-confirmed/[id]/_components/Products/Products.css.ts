import { css } from "@/theme";

export const listClass = css({
  marginBottom: 10,
  paddingLeft: 10,
});

export const titleClass = css({
  marginBlock: "5px 10px",
});

export const modifierClass = css({
  fontSize: 17,

  ":before": {
    content: "-",
    display: "inline-block",
    marginRight: 4,
  },
});

export const subModifierClass = css({
  display: "block",
  fontSize: 17,

  ":before": {
    content: "--",
    display: "inline-block",
    marginRight: 4,
  },
});
