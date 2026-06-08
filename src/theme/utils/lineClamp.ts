import type { StyleArg } from "./types";

const lineClamp = (lines: number): StyleArg => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lines,
});

export { lineClamp };
