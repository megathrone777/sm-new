import React from "react";
import Image from "next/image";
import Link from "next/link";

import { deleteCategory } from "@/app/(auth)/(admin)/_actions";
import { ListLayout } from "@/app/(auth)/(admin)/_components";
import { productsHelpers } from "@/helpers";
import { Button } from "@/ui";

import {
  headerClass,
  imageClass,
  imageHolderClass,
  itemClass,
  linkClass,
  listClass,
} from "./CategoriesList.css";

const CategoriesList: React.FC = async () => {
  const categories = await productsHelpers.getCategories();

  return (
    <ListLayout
      deleteAction={deleteCategory}
      href="/admin/categories"
    >
      <div className={headerClass}>
        <p>ID</p>
        <p>Image</p>
        <p>Title</p>
        <p>Sort order</p>
        <p>Products total</p>
        <p>Actions</p>
      </div>

      {categories && !!categories.length && (
        <div className={listClass}>
          {categories.map(
            ({
              id,
              imageUrl,
              products,
              sortOrder,
              title,
            }: TProductCategory): React.ReactElement => (
              <div
                className={itemClass}
                key={`admin-category-${id}`}
              >
                <Link
                  className={linkClass}
                  href={`/admin/category/${id}`}
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
                  <p>{sortOrder}</p>
                  <p>{products.length}</p>
                </Link>

                {id === 0 ? (
                  <div style={{ minWidth: 38 }} />
                ) : (
                  <Link
                    href={`/admin/categories?deleteId=${id}&deleteTitle=${encodeURIComponent(title)}`}
                    scroll={false}
                  >
                    <Button
                      iconId="trash"
                      template="small"
                    />
                  </Link>
                )}
              </div>
            ),
          )}
        </div>
      )}
    </ListLayout>
  );
};

export { CategoriesList };
