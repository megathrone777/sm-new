import { css } from "@/theme";

export const wrapperClass = css({
  marginBottom: 15,
});

export const listClass = css({
  marginBlock: 0,
});

export const itemClass = css({
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
