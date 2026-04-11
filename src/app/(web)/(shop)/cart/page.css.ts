import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  minHeight: 570,
  paddingTop: 15,

  "@media": {
    [devices.mobile]: {
      paddingTop: 20,
    },
  },
}));

export const layoutClass = css(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  // gridTemplateAreas: `
  //   "cutlery cutlery"
  //   "delivery delivery"
  //   "conditions conditions"
  //   "additionals additionals"
  //   "note note"
  //   "promo promo"
  //   "payment payment"
  //   "submit submit"
  // `,
  rowGap: 20,

  "@media": {
    [devices.tablet]: {
      columnGap: 30,
      gridTemplateColumns: "1fr 1fr",
      justifyContent: "space-between",
    },

    [devices.desktop]: {
      columnGap: 100,
      gridTemplateAreas: `
        "delivery cutlery"
        "delivery additionals"
        "delivery note"
        "delivery promo"
        "delivery payment"
        "delivery submit"
      `,
    },
  },
}));
