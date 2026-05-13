import { css } from "@/theme";

export const wrapperClass = css({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  rowGap: 30,
});

export const titleClass = css(({ fonts }) => ({
  color: "wheat",
  fontSize: 32,
  fontWeight: fonts.normal,
}));

export const imageClass = css({
  height: 300,
  width: "auto",
});
