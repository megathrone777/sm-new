import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 20,

  "@media": {
    [devices.tablet]: {
      alignContent: "start",
      alignItems: "start",
      columnGap: 24,
      gridAutoFlow: "unset",
      gridTemplateAreas: `
        "delivery cutlery"
        "delivery additionals"
        "delivery note"
        "delivery promo"
        "delivery payment"
      `,
      gridTemplateColumns: "1fr 1fr",
    },

    [devices.desktop]: {
      columnGap: 100,
    },
  },
}));
