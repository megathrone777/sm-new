import { style } from "@/theme";

export const wrapperClass = style({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  rowGap: 30,
});

export const titleClass = style(({ fonts }) => ({
  color: "wheat",
  fontSize: 32,
  fontWeight: fonts.normal,
}));

export const imageClass = style({
  height: 300,
  width: "auto",
});
