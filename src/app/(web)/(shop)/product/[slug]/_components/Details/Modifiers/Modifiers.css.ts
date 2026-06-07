import { style, styleVariants } from "@/theme";

export const wrapperClass = styleVariants(
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

export const layoutClass = style({});

export const subModifiersClass = style(({ easing }) => ({
  display: "grid",
  gridTemplateRows: "0fr",
  selectors: {
    [`${layoutClass}:has(input[type='checkbox']:checked) > &`]: {
      gridTemplateRows: "1fr",
    },
  },
  transition: `grid-template-rows .25s ${easing}`,
}));

export const subModifiersLayoutClass = style({
  overflow: "hidden",
});

export const subListClass = style({
  display: "grid",
  gridAutoFlow: "row",
  padding: "10px 0 10px 20px",
  rowGap: 10,
});

export const priceHolderClass = style({
  whiteSpace: "nowrap",
});

export const priceClass = style(({ colors }) => ({
  color: colors.red,
  whiteSpace: "nowrap",
}));
