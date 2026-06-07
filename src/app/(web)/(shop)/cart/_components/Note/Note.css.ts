import { style } from "@/theme";

export const wrapperClass = style({
  marginTop: 10,
  paddingBottom: 5,
  position: "relative",
});

export const iconClass = style(({ colors }) => ({
  color: colors.red,
  display: "block",
  height: 34,
  left: 3,
  position: "absolute",
  top: 0,
  width: 30,
}));

export const textareaClass = style(({ colors, devices, fonts }) => ({
  border: "none",
  borderBottom: `2px solid ${colors.red}`,
  borderRadius: 0,
  display: "block",
  fieldSizing: "content",
  fontFamily: "inherit",
  fontSize: 16,
  fontWeight: fonts.medium,
  lineHeight: 1.2,
  marginInline: "auto",
  minHeight: 60,
  paddingBlock: "5px 10px",
  paddingInline: "40px 5px",
  resize: "none",
  width: "100%",

  ":focus": {
    outline: "none",
  },

  "@media": {
    [devices.desktop]: {
      paddingRight: 80,
    },
  },
}));
