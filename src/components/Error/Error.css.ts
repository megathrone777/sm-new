import { css } from "@/theme";

export const wrapperClass = css({
  alignContent: "start",
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "row",
  justifyContent: "center",
  justifyItems: "center",
  paddingBlock: 30,
});

export const titleClass = css(({ fonts }) => ({
  fontSize: 33,
  fontWeight: fonts.bold,
  marginBottom: 20,
  textAlign: "center",
}));

export const imageClass = css({
  height: 360,
  marginBottom: 30,
  width: "auto",
});
