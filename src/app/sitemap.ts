import { store } from "@/store";

import type { MetadataRoute } from "next";

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { changeFrequency: "weekly", priority: 1.0, url: "" },
  { changeFrequency: "weekly", priority: 0.9, url: "/menu" },
  { changeFrequency: "monthly", priority: 0.7, url: "/contacts" },
  { changeFrequency: "yearly", priority: 0.3, url: "/terms" },
  { changeFrequency: "yearly", priority: 0.3, url: "/rules" },
];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const publicURL: string = process.env.PUBLIC_URL;
  const productsList = await store.products.getAll();

  const products: MetadataRoute.Sitemap = productsList.map<MetadataRoute.Sitemap[0]>(
    ({ slug }: TProduct) => ({
      changeFrequency: "weekly",
      priority: 0.8,
      url: `${publicURL}/product/${slug}`,
    }),
  );
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((entry) => ({
    ...entry,
    url: `${publicURL}${entry.url}`,
  }));

  return [...staticEntries, ...products];
};

export default sitemap;
