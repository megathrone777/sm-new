import type { Metadata } from "next";

const description: string =
  "Každý set je tvořen s láskou, z čerstvých ingrediencí a ve správné kombinaci. Na doručení používáme EKO boxy, abychom aspoň trochu odlehčili přírodě.";
const imageURL: string = "/images/og_img.jpg";
const publicURL: string = process.env.APP_URL;
const title: string = "Sushi Man | Všeobecné obchodní podmínky";

const metadata: Metadata = {
  description,
  openGraph: {
    description,
    images: imageURL,
    title,
    type: "website",
    url: publicURL,
  },
  title,
};

export { metadata };
