import { style } from "@/theme";

export const wrapperClass = style({
  marginInline: -5,
  paddingBlock: 20,
});

export const titleClass = style(({ colors, fonts }) => ({
  borderBottom: `3px solid ${colors.red}`,
  fontSize: 20,
  fontWeight: fonts.bold,
  padding: 5,
  textAlign: "left",
  width: "100%",
}));

export const descriptionClass = style({
  fontSize: 16,
  marginBottom: 5,
  padding: "10px 5px",
  width: "100%",
});

export const rowClass = style({
  columnGap: 30,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
  paddingLeft: 5,
  width: "100%",
});
