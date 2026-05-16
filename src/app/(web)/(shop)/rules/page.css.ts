import { css, globalStyle } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
  borderTop: `10px solid ${colors.red}`,
  paddingBlock: 40,
  textAlign: "justify",
}));

export const layoutClass = css({});

globalStyle(`${layoutClass} h2`, ({ fonts }) => ({
  fontSize: 22,
  fontWeight: fonts.medium,
  marginBottom: 10,
  marginTop: 20,
}));

globalStyle(`${layoutClass} h3`, ({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.medium,
  marginBottom: 8,
  marginTop: 16,
}));

globalStyle(`${layoutClass} h4`, ({ fonts }) => ({
  fontSize: 16,
  fontWeight: fonts.medium,
  marginBottom: 6,
  marginTop: 12,
}));

globalStyle(`${layoutClass} p`, {
  marginBottom: 12,
});

globalStyle(`${layoutClass} strong`, ({ fonts }) => ({
  fontWeight: fonts.medium,
}));

globalStyle(`${layoutClass} ul`, {
  listStyle: "disc",
  marginBottom: 10,
  paddingLeft: 17,
});

globalStyle(`${layoutClass} ul li`, {
  marginBottom: 7,
});
