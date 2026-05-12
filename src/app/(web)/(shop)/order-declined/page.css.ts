import { css } from "@/theme";

export const wrapperClass = css({
  paddingBlock: 30,
});

export const layoutClass = css({
  textAlign: "center",
});

export const titleClass = css(({ devices, fonts }) => ({
  fontSize: 24,
  fontWeight: fonts.medium,

  "@media": {
    [devices.mobile]: {
      fontSize: 36,
    },
  },
}));

export const imageClass = css({
  height: 360,
  marginBottom: 30,
  width: "auto",
});
