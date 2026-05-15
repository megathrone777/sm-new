import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  setupFiles: ["<rootDir>/jest.polyfills.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.css\\.ts$": "identity-obj-proxy",
    "\\.css$": "identity-obj-proxy",
    "^@/ui$": "<rootDir>/src/theme/components/index.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["node_modules/(?!(uncrypto|@upstash/realtime|@upstash/redis)/)"],
};

module.exports = createJestConfig(config);
