import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  paddingBlock: 30,

  "@media": {
    [devices.tablet]: {
      paddingBlock: 40,
    },
  },
}));

export const layoutClass = style({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const titleClass = style(({ devices, fonts }) => ({
  color: "white",
  fontSize: 26,
  fontWeight: fonts.medium,
  marginBottom: 15,
  textAlign: "center",

  "@media": {
    [devices.desktop]: {
      fontSize: 34,
    },
  },
}));

export const timeClass = style(({ fonts }) => ({
  color: "white",
  fontSize: 20,
  fontWeight: fonts.medium,
  margin: "0 auto 25px",
  maxWidth: 700,
  textAlign: "center",
}));

export const contactsClass = style({
  minHeight: 60,
  paddingBottom: 10,
});

export const statusClass = style(({ colors, devices, fonts }) => ({
  color: colors.red,
  fontSize: 20,
  fontWeight: fonts.medium,
  paddingTop: 10,
  textAlign: "center",

  "@media": {
    [devices.mobile]: {
      paddingTop: 20,
    },

    [devices.tablet]: {
      fontSize: 24,
    },
  },
}));

export const statusOnlineClass = style({
  color: "green",
});
