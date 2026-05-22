import { css } from "@/theme";

export const mapContainerClass = css({
  height: 200,
  overflow: "hidden",
  position: "relative",
  width: "100%",
  zIndex: 8,
  "& .maplibregl-canvas": {
    filter: "brightness(1.2)",
  },
});
