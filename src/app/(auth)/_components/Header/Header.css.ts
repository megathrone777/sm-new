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

export const sideClass = css({
  alignItems: "center",
  columnGap: 40,
  display: "grid",
  gridAutoFlow: "column",
});

export const goLinkClass = css(({ colors, easing, fonts }) => ({
  alignItems: "center",
  color: "white",
  columnGap: 8,
  display: "inline-grid",
  fontSize: 15,
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  transition: `color .25s ${easing}`,

  ":hover": {
    color: colors.red,
  },
}));

export const iconClass = css({
  height: 18,
});
