import type { MetadataRoute } from "next";

const isProduction: boolean = process.env.APP_ENV === "production";

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
          "/orderConfirmed",
          "/orderDeclined",
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
