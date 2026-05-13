import type React from "react";

export interface TProps {
  categoryDiscount: number;
  children: React.ReactNode;
  initialProducts: TCartProduct[];
  placeholder: React.ReactNode;
  productsTitle: string;
  queue: React.ReactNode;
}
