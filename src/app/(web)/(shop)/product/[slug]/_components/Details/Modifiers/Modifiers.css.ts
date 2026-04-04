import { css, cssVariants } from "@/theme";

export const wrapperClass = cssVariants(
  {
    "1": "repeat(1, 1fr)",
    "2": "repeat(2, 1fr)",
  },
  (gridTemplateColumns) => [
    {
      display: "grid",
      gap: 10,
    },
    {
      gridTemplateColumns,
    },
  ],
);

export const layoutClass = css({});

export const subModifiersClass = css(({ easing }) => ({
  display: "grid",
  gridTemplateRows: "0fr",
  selectors: {
    [`${layoutClass}:has(input[type='checkbox']:checked) > &`]: {
      gridTemplateRows: "1fr",
    },
  },
  transition: `grid-template-rows .25s ${easing}`,
}));

export const subModifiersLayoutClass = css({
  overflow: "hidden",
});

export const subListClass = css({
  display: "grid",
  gridAutoFlow: "row",
  padding: "10px 0 10px 20px",
  rowGap: 10,
});

export const priceHolderClass = css({
  whiteSpace: "nowrap",
});

export const priceClass = css(({ colors }) => ({
  color: colors.red,
  whiteSpace: "nowrap",
}));
