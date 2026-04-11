import { css } from "@/theme";

export const wrapperClass = css({
  position: "relative",
});

export const iconClass = css(({ colors }) => ({
  color: colors.red,
  display: "block",
  height: 34,
  left: 5,
  position: "absolute",
  top: 1,
  width: 30,
}));

export const textareaClass = css(({ colors, fonts }) => ({
  border: "none",
  borderBottom: `2px solid ${colors.red}`,
  borderRadius: 0,
  display: "block",
  fontFamily: "inherit",
  fontSize: 16,
  fontWeight: fonts.medium,
  height: 60,
  marginInline: "auto",
  padding: "5px 40px",
  resize: "none",
  width: "100%",

  ":focus": {
    outline: "none",
  },
}));
