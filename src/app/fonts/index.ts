import localFont from "next/font/local";

const avenir = localFont({
  display: "block",
  src: [
    {
      path: "./AvenirNext-Regular.woff",
      style: "normal",
      weight: "400",
    },
    {
      path: "./AvenirNext-Demi.woff",
      style: "normal",
      weight: "500",
    },
    {
      path: "./AvenirNext-Medium.woff",
      style: "normal",
      weight: "600",
    },
    {
      path: "./AvenirNext-Bold.woff",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-avenir",
});

const franklin = localFont({
  display: "block",
  src: "./Franklin-Gothic-Medium.ttf",
  variable: "--font-franklin",
  weight: "500",
});

const akrobat = localFont({
  display: "block",
  src: "./Akrobat-Black.otf",
  variable: "--font-akrobat",
  weight: "900",
});

const fonts = { akrobat, avenir, franklin };

export { fonts };
