import { css, globalStyle } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
  borderTop: `10px solid ${colors.red}`,
  paddingBlock: 40,
  textAlign: "justify",
}));

export const layoutClass = css({});

globalStyle(`${layoutClass} > h2`, ({ fonts }) => ({
  fontSize: 22,
  fontWeight: fonts.medium,
  marginBottom: 10,
}));

globalStyle(`${layoutClass} > p`, {
  marginBottom: 12,
});

globalStyle(`${layoutClass} > p > strong`, ({ fonts }) => ({
  fontSize: 22,
  fontWeight: fonts.medium,
}));

globalStyle(`${layoutClass} > ul`, {
  listStyle: "disc",
  marginBottom: 10,
  paddingLeft: 17,
});

globalStyle(`${layoutClass} > ul > li`, {
  marginBottom: 7,
});
