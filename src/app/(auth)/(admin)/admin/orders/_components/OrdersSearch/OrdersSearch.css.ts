import { rgba, style } from "@/theme";

export const listClass = style({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 4,
});

export const infoClass = style(({ colors }) => ({
  alignItems: "center",
  borderRadius: 6,
  columnGap: 12,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "max-content 1fr 1fr",
  justifyContent: "start",
  padding: 6,

  ":hover": {
    backgroundColor: rgba(colors.black, 0.05),
  },
}));
