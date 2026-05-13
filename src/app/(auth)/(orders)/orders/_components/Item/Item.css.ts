import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
  backgroundColor: colors.grayDarker,
  border: "4px solid white",
  borderRadius: 10,
  color: "white",
  display: "flex",
  flexDirection: "column",
  padding: 10,
  position: "relative",
  selectors: {
    "&.new": { borderColor: "red" },
    "&.new.time": { borderColor: "darkviolet" },
    "&.placed, &.done": { borderColor: "gray" },
    "&.ready": { borderColor: colors.greenLighter },
    "&.started": { borderColor: "#3b82f6" },
    "&.took": { borderColor: colors.yellow },
  },
  width: `${calc("25%").subtract("8px")}`,

  "@media": {
    [devices.mobile]: {
      width: "100%",
    },

    [devices.tablet]: {
      width: "calc(50% - 5px)",
    },

    [devices.desktop]: {
      width: "calc(33.3333% - 7px)",
    },
  },
}));

export const noteClass = css({
  fontSize: 17,
  lineHeight: 1.3,
  marginBottom: 15,
  marginTop: -5,
  whiteSpace: "pre-line",
});

export const contentClass = css({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
});

export const itemClass = css({
  alignItems: "flex-start",
  display: "flex",
  fontSize: 17,
  marginBottom: 15,

  selectors: {
    "&.wrap": { flexWrap: "wrap" },
  },
});

export const labelClass = css({
  lineHeight: 1.2,
  marginRight: 4,
  whiteSpace: "nowrap",
});

export const valueClass = css(({ colors }) => ({
  fontSize: 18,
  lineHeight: 1.2,
  overflow: "hidden",
  selectors: {
    "&.normal": { fontSize: 17 },
    "&.primary": { color: colors.greenLighter },
    "&.secondary": { color: colors.yellow },
  },
  textOverflow: "ellipsis",
  whiteSpace: "break-spaces",
}));
