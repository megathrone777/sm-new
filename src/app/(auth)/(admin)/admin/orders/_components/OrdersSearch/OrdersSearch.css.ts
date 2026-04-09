import { css } from "@/theme";

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 4,
});

export const infoClass = css({
  alignItems: "center",
  borderRadius: 6,
  columnGap: 12,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "max-content 1fr 1fr",
  justifyContent: "start",
  padding: 6,

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, .05)",
  },
});
