import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    disallow: "/",
    userAgent: "*",
  },
  sitemap: `${process.env.PUBLIC_URL}/sitemap.xml`,
});

export default robots;
