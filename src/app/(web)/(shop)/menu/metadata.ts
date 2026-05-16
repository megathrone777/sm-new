import type { Metadata } from "next";

const description: string =
  "Každý set je tvořen s láskou, z čerstvých ingrediencí a ve správné kombinaci. Na doručení používáme EKO boxy, abychom aspoň trochu odlehčili přírodě.";
const title: string = "Sushi Man | Menu";

const metadata: Metadata = {
  description,
  openGraph: {
    description,
    images: "/images/og_img.jpg",
    title,
    type: "website",
    url: process.env.PUBLIC_URL,
  },
  title,
};

export { metadata };
