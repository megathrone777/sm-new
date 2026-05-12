import type { MetadataRoute } from "next";

const isProduction: boolean = process.env.NODE_ENV === "production";

const robots = (): MetadataRoute.Robots => {
  if (isProduction) {
    return {
      rules: {
        allow: [
          "/",
          "/product/*",
          "/rules",
          "/terms",
          "/cart",
          "/order-confirmed",
          "/order-declined",
        ],
      },
    };
  }

  return {
    rules: {
      disallow: "/",
      userAgent: "*",
    },
  };
};

export default robots;
