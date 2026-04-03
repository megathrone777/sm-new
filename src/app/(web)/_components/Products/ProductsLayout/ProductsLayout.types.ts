export interface TProps {
  categories: TProductCategory[];
  renderedProducts: Record<TProductCategory["id"], React.ReactNode[]>;
  showAll?: true;
  title: string;
}
