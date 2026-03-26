"use client";
import React from "react";

const Products: React.FC<{ products: TProduct[] }> = ({ products }) => (
  <div>
    <ul>
      {products.map(
        ({ id, title }: TProduct): React.ReactElement => (
          <li key={`${id}-product`}>{title}</li>
        )
      )}
    </ul>
  </div>
);

export { Products };
