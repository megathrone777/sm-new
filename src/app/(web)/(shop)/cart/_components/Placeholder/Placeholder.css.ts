import { style } from "@/theme";

export const wrapperClass = style(({ devices, fonts }) => ({
  alignItems: "center",
  display: "grid",
  fontSize: 25,
  fontWeight: fonts.bold,
  gridAutoFlow: "row",
  justifyItems: "center",
  paddingBottom: 40,
  rowGap: 20,

  "@media": {
    [devices.tablet]: {
      fontSize: 30,
    },
  },
}));

export const imageHolderClass = style({
  marginInline: "auto",
});

export const imageClass = style({
  height: 400,
  width: "auto",
});
