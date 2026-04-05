import { css } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
  alignItems: "center",
  backgroundColor: colors.black,
  display: "grid",
  gridAutoFlow: "column",
  height: 80,
  justifyContent: "space-between",
  paddingBlock: 4,
  paddingInline: 16,
  position: "sticky",
  top: 0,
  zIndex: 100,
}));

export const linkClass = css({
  display: "block",
  height: "90%",
  overflow: "hidden",
});

export const imageClass = css({
  display: "block",
  height: "100%",
});
