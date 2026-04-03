import { css } from "@/theme";

export const wrapperClass = css({
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "row",
  height: "100%",
  justifyContent: "center",
  paddingBlock: 30,
});

export const titleClass = css(({ fonts }) => ({
  fontSize: 33,
  fontWeight: fonts.bold,
  marginBottom: 20,
  textAlign: "center",
}));

export const imageClass = css({
  marginBottom: 30,
  maxHeight: 450,
});
