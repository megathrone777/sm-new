import { css } from "@/theme";

export const buttonClass = css(({ colors, devices, easing }) => ({
  alignItems: "center",
  alignSelf: "stretch",
  backgroundColor: colors.red,
  border: "none",
  borderRadius: "5px 0 5px 0",
  color: "white",
  cursor: "pointer",
  display: "inline-grid",
  height: 50,
  justifyContent: "center",
  minHeight: "100%",
  minWidth: 80,
  textDecoration: "none",
  transition: `min-width 0.15s ${easing}`,
  width: 80,

  ":disabled": {
    cursor: "default",
    opacity: 0.7,
  },

  ":focus": {
    outline: "none",
  },

  "@media": {
    [devices.pointerFine]: {
      ":hover": {
        minWidth: 85,
      },
    },

    [devices.mobile]: {
      borderRadius: "5px 0 0 5px",
      height: 45,
      minWidth: 64,
      width: 64,
    },
  },
}));

export const iconClass = css({
  height: 24,
});
