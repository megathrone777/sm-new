import { css } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
  backgroundColor: colors.black,
  color: "white",
  height: "100%",

  "@media": {
    [devices.pointerCoarse]: {
      paddingBottom: "env(safe-area-inset-bottom)",
    },
  },
}));

export const titleClass = css(({ devices }) => ({
  fontFamily: "var(--font-akrobat)",
  fontSize: 42,

  "@media": {
    [devices.desktop]: {
      fontSize: 46,
    },
  },
}));

export const layoutClass = css(({ devices }) => ({
  alignContent: "center",
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "row",
  height: "100%",
  justifyContent: "center",
  justifyItems: "center",
  rowGap: 15,

  "@media": {
    [devices.desktop]: {
      rowGap: 28,
    },
  },
}));

export const imageClass = css(({ devices }) => ({
  height: 140,
  width: "auto",

  "@media": {
    [devices.desktop]: {
      height: 155,
    },
  },
}));

export const formClass = css(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 20,
  width: "100%",

  "@media": {
    [devices.desktop]: {
      rowGap: 22,
      width: 400,
    },
  },
}));
