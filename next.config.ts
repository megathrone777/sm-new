import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "on" },
});

const config: NextConfig = {
  allowedDevOrigins: ["192.168.0.227", "192.168.137.74", "172.17.208.1"],
  images: {
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    dangerouslyAllowSVG: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        hostname: "*.public.blob.vercel-storage.com",
        protocol: "https",
      },
    ],
  },
  outputFileTracingIncludes: {
    "**/*": ["./src/services/emailSender/template/**/*.pug"],
  },
  reactStrictMode: false,
  redirects: async () => [
    {
      destination: "https://:domain/:path*",
      has: [{ type: "host", value: "www\\.(?<domain>.+)" }],
      permanent: true,
      source: "/:path*",
    },
  ],
  typedRoutes: true,
};

export default withVanillaExtract(config);
