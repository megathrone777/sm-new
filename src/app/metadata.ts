import type { Metadata } from "next";

const description: string = `Každý set je tvořen s láskou, 
  z čerstvých ingrediencí a ve správné kombinaci. Na doručení 
  používáme EKO boxy, abychom aspoň trochu odlehčili přírodě.`;
const imageURL: string = "/images/og_img.jpg";
const publicURL: string = process.env.APP_URL;
const title: string = "Sushi Man | Rozvoz sushi po Praze";

const metadata: Metadata = {
  description,
  formatDetection: {
    telephone: false,
  },
  icons: [
    {
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      sizes: "96x96",
      type: "image/png",
      url: "/favicon-96x96.png",
    },
  ],
  metadataBase: new URL(publicURL),
  openGraph: {
    description,
    images: `${publicURL}${imageURL}`,
    siteName: "Sushi Man",
    title,
    type: "website",
    url: publicURL,
  },
  title,
  twitter: {
    card: "summary_large_image",
    description,
    images: imageURL,
  },
  verification: {
    yandex: "2d640540016895e1",
  },
};

export { metadata };
