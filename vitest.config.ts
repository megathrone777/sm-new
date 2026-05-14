import path from "path";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const config = defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: [
      { find: "@/ui", replacement: path.resolve(__dirname, "./src/theme/components/index.ts") },
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/setup.ts"],
  },
});

export default config;
