import { css } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
  backgroundColor: colors.black,
  borderTop: `4px solid ${colors.red}`,
  paddingTop: 20,

  "@media": {
    [devices.tablet]: {
      paddingTop: 40,
    },
  },
}));

export const layoutClass = css({
  display: "block",
  paddingBottom: 6,
  textAlign: "center",
});

export const copyClass = css(({ colors, devices }) => ({
  borderTop: `1px solid ${colors.whiteDarker}`,
  fontSize: 19,
  paddingBlock: 15,
  textAlign: "center",

  "@media": {
    [devices.tablet]: {
      paddingBlock: 30,
    },
  },
}));

export const copyTextClass = css({
  color: "white",
  fontSize: 12,
});
