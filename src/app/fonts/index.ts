import localFont from "next/font/local";

const avenir = localFont({
  display: "block",
  src: [
    {
      path: "./AvenirNext-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./AvenirNext-Demi.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "./AvenirNext-Medium.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "./AvenirNext-Bold.woff2",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-avenir",
});

const franklin = localFont({
  display: "block",
  src: "./Franklin-Gothic-Medium.woff2",
  variable: "--font-franklin",
  weight: "500",
});

const akrobat = localFont({
  display: "block",
  src: "./Akrobat-Black.woff2",
  variable: "--font-akrobat",
  weight: "900",
});

const fonts = { akrobat, avenir, franklin };

export { fonts };
