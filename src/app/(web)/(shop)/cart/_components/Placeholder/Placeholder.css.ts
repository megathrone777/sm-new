import { css } from "@/theme";

export const wrapperClass = css(({ devices, fonts }) => ({
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

export const imageHolderClass = css({
  marginInline: "auto",
});

export const imageClass = css({
  height: 400,
  width: "auto",
});
