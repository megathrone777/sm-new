import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "auto" },
});

const config: NextConfig = {
  images: {
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  reactStrictMode: false,
  // redirects: async () => [
  //   {
  //     destination: "https://sushi-man.cz/:path*",
  //     has: [{ type: "host", value: "www.sushi-man.cz" }],
  //     permanent: true,
  //     source: "/:path*",
  //   },
  // ],
  typedRoutes: true,
};

export default withVanillaExtract(config);
