import { store } from "@/store";

import type { Metadata } from "next";

const publicURL: string = process.env.PUBLIC_URL;
const fallbackDescription: string =
  "Každý set je tvořen s láskou, z čerstvých ingrediencí a ve správné kombinaci. Na doručení používáme EKO boxy, abychom aspoň trochu odlehčili přírodě.";

const generateMetadata = async ({ params }: PageProps<"/product/[slug]">): Promise<Metadata> => {
  const { slug } = await params;
  const product = await store.products.getBySlug(slug);

  if (product) {
    const { composition, imageUrl, title } = product;
    const description = `Složení: ${composition}`;

    return {
      description,
      openGraph: {
        description,
        images: imageUrl,
        title: `Sushi Man | ${title}`,
        type: "website",
        url: `${publicURL}/product/${slug}`,
      },
      title: `Sushi Man | ${title}`,
    };
  }

  return {
    description: fallbackDescription,
    openGraph: {
      description: fallbackDescription,
      images: "/images/og_img.jpg",
      title: "Sushi Man | Rozvoz sushi po Praze",
      type: "website",
      url: publicURL,
    },
    title: "Sushi Man | Rozvoz sushi po Praze",
  };
};

export { generateMetadata };
