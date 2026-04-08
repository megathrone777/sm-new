interface TSortItem {
  sortOrder: number;
}

const sortByOrder = <D extends TSortItem>(items: D[]): D[] =>
  items.sort((itemA: D, itemB: D) => itemA.sortOrder - itemB.sortOrder);

export { sortByOrder };
