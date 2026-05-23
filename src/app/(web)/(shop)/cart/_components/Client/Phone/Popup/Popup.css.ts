import { css } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
  borderBottom: `2px solid ${colors.red}`,
  padding: 6,
}));

export const inputClass = css(({ fonts }) => ({
  border: "none",
  borderRadius: 4,
  fontFamily: "inherit",
  fontSize: 16,
  fontWeight: fonts.medium,
  outline: "none",
  paddingBlock: 0,
  paddingInline: 8,
  width: "100%",

  ":focus": {
    outline: "none",
  },
}));
