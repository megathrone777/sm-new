import { style } from "@/theme";

export const wrapperClass = style({
  marginBottom: 15,
});

export const listClass = style({
  marginBlock: 0,
});

export const itemClass = style({
  display: "block",
  fontSize: 15,
  marginBottom: 5,

  selectors: {
    "&::before": {
      content: "'--'",
      display: "inline-block",
      marginRight: 4,
      verticalAlign: "middle",
    },
  },
});
