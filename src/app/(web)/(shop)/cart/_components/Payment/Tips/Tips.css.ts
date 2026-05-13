import { css } from "@/theme";

export const wrapperClass = css({
  paddingBlock: 20,
});

export const titleClass = css(({ colors, fonts }) => ({
  borderBottom: `3px solid ${colors.red}`,
  fontSize: 20,
  fontWeight: fonts.bold,
  padding: 5,
  textAlign: "left",
  width: "100%",
}));

export const descriptionClass = css({
  fontSize: 16,
  marginBottom: 5,
  padding: "10px 5px",
  width: "100%",
});

export const labelClass = css(({ fonts }) => ({
  fontWeight: fonts.bold,
}));

export const rowClass = css({
  columnGap: 30,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
  paddingLeft: 5,
  width: "100%",
});
