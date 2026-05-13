import { css } from "@/theme";

export const wrapperClass = css({
  paddingBlock: 30,
});

export const layoutClass = css({
  display: "grid",
  gridAutoFlow: "row",
  justifyItems: "center",
  rowGap: 30,
  textAlign: "center",
});

export const titleClass = css(({ devices, fonts }) => ({
  fontSize: 24,
  fontWeight: fonts.medium,
  textWrap: "balance",

  "@media": {
    [devices.mobile]: {
      fontSize: 36,
    },
  },
}));

export const imageClass = css({
  height: 340,
  width: "auto",
});
