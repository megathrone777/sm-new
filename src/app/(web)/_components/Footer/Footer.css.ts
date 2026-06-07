import { style } from "@/theme";

export const wrapperClass = style(({ colors, devices }) => ({
  backgroundColor: colors.black,
  borderTop: `4px solid ${colors.red}`,
  paddingTop: 20,

  "@media": {
    [devices.pointerCoarse]: {
      marginBottom: -2,
      paddingBottom: "env(safe-area-inset-bottom)",
    },

    [devices.tablet]: {
      paddingTop: 40,
    },
  },
}));

export const layoutClass = style({
  display: "block",
  paddingBottom: 6,
  textAlign: "center",
});

export const copyClass = style(({ colors, devices }) => ({
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

export const copyTextClass = style({
  color: "white",
  fontSize: 12,
});
