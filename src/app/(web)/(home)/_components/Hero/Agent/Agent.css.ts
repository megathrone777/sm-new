import { rgba, style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  alignContent: "center",
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "row",
  justifyContent: "stretch",
  justifyItems: "center",
  padding: "30px 5px 20px",
  rowGap: 12,

  "@media": {
    [devices.desktop]: {
      rowGap: 18,
    },
  },
}));

export const titleClass = style(({ colors, devices, fonts }) => ({
  color: colors.white,
  fontSize: 21,
  fontWeight: fonts.bold,
  lineHeight: 1.2,
  textAlign: "center",

  "@media": {
    [devices.desktop]: {
      fontSize: 27,
    },
  },
}));

export const formClass = style(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  maxWidth: 600,
  rowGap: 12,
  width: "100%",

  "@media": {
    [devices.desktop]: {
      rowGap: 16,
    },
  },
}));

export const contentClass = style(({ colors, devices }) => ({
  backgroundColor: rgba(colors.blackDarker, 0.55),
  backgroundImage: `linear-gradient(180deg, ${rgba(colors.whiteLightest, 0.07)}, ${rgba(colors.whiteLightest, 0.035)})`,
  border: `1px solid ${rgba(colors.whiteLightest, 0.12)}`,
  borderRadius: 18,
  boxShadow: `0 26px 64px -30px ${rgba(colors.black, 0.85)}, inset 0 1px 0 ${rgba(colors.whiteLightest, 0.06)}`,
  paddingBottom: 12,
  transition: "height .1s ease",
  width: "100%",

  "@media": {
    [devices.desktop]: {
      paddingBottom: 14,
    },
  },
}));

export const messageClass = style(({ animations, colors, devices }) => ({
  animation: `${animations.fadeInUp} .3s ease-in`,
  color: colors.whiteLightest,
  fontSize: 15,
  padding: "17px 14px 4px",
  whiteSpace: "pre-wrap",

  "@media": {
    [devices.desktop]: {
      fontSize: 16,
      padding: "18px 18px 6px",
    },
  },
}));

export const textareaClass = style(({ colors, devices }) => ({
  backgroundColor: "transparent",
  border: "none",
  color: colors.whiteLightest,
  fieldSizing: "content",
  fontFamily: "inherit",
  fontSize: 15,
  minHeight: 67,
  padding: "17px 14px 8px",
  resize: "none",
  width: "100%",

  "::placeholder": {
    color: rgba(colors.whiteLightest, 0.4),
  },

  ":focus": {
    outline: "none",
  },

  "@media": {
    [devices.mobile]: {
      minHeight: "2lh",
    },

    [devices.desktop]: {
      fontSize: 17,
      padding: "18px 18px 10px",
    },
  },
}));
