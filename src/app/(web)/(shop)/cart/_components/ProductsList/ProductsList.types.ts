export interface TProps {
  categoryDiscount: number;
  onRemove: (index: number) => void;
  products: TCartProduct[];
}
