import { style } from "@/theme";

export const listClass = style({
  marginBottom: 15,
});

export const itemClass = style({
  color: "white",
  fontSize: 18,
  marginBottom: 10,

  ":last-of-type": { marginBottom: 0 },
});

export const subListClass = style({
  marginBottom: 5,

  ":last-of-type": { marginBottom: 0 },
});

export const subItemClass = style({
  fontSize: 16,
  marginBottom: 7,

  ":before": {
    content: "'-'",
    display: "inline-block",
    marginRight: 4,
    verticalAlign: "middle",
  },

  ":last-of-type": { marginBottom: 0 },
});

export const subItem2Class = style({
  display: "block",
  fontSize: 15,
  marginBottom: 5,

  ":before": {
    content: "'--'",
    display: "inline-block",
    marginRight: 4,
    verticalAlign: "middle",
  },

  ":last-of-type": { marginBottom: 0 },
});
