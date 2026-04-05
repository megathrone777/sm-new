import React from "react";
import Image from "next/image";
import Link from "next/link";

import { productsHelpers } from "@/helpers";
import { Button } from "@/ui";

import {
  headerClass,
  imageClass,
  imageHolderClass,
  itemClass,
  linkClass,
  listClass,
} from "./ProductsList.css";

const ProductsList: React.FC = async () => {
  const products = await productsHelpers.getProducts();

  return (
    <>
      <div className={headerClass}>
        <p>ID</p>
        <p>Image</p>
        <p>Title</p>
        <p>Price (CZK)</p>
        <p>Actions</p>
      </div>

      {!!products.length && (
        <div className={listClass}>
          {products.map(
            ({ id, imageUrl, price, slug, title }): React.ReactElement => (
              <div
                className={itemClass}
                key={`admin-product-item-${id}`}
              >
                <Link
                  className={linkClass}
                  href={`/admin/product/${slug}`}
                >
                  <p>{id}</p>

                  <div className={imageHolderClass}>
                    <Image
                      alt={title}
                      className={imageClass}
                      fill
                      loading="eager"
                      src={imageUrl}
                    />
                  </div>

                  <p>{title}</p>
                  <p>{price} (CZK)</p>
                </Link>

                <Link
                  href={`/admin/products?deleteId=${slug}&deleteTitle=${encodeURIComponent(title)}`}
                  scroll={false}
                >
                  <Button
                    iconId="trash"
                    template="small"
                  />
                </Link>
              </div>
            ),
          )}
        </div>
      )}
    </>
  );
};

export { ProductsList };
