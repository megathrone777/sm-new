import { style } from "@/theme";

export const wrapperClass = style({
  paddingBlock: 30,
});

export const layoutClass = style({
  display: "grid",
  gridAutoFlow: "row",
  justifyItems: "center",
  rowGap: 30,
  textAlign: "center",
});

export const titleClass = style(({ devices, fonts }) => ({
  fontSize: 24,
  fontWeight: fonts.medium,
  textWrap: "balance",

  "@media": {
    [devices.mobile]: {
      fontSize: 36,
    },
  },
}));

export const imageClass = style({
  height: 340,
  width: "auto",
});
