import React from "react";

import { createCategory } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, ImageUploader, ProductsSelect } from "@/app/(auth)/(admin)/_components";
import { productsHelpers } from "@/helpers";
import { Input } from "@/ui";

import { wrapperClass } from "./CreateCategory.css";

const CreateCategory: React.FC = async () => {
  const products = await productsHelpers.getProducts();

  return (
    <FormLayout
      className={wrapperClass}
      formAction={createCategory}
    >
      <Input
        label="Title"
        name="title"
        placeholder="New category title"
        type="text"
      />

      <ImageUploader />

      <Input
        defaultValue="0"
        label="Sort order"
        name="sortOrder"
        type="number"
      />

      {products && !!products.length && (
        <ProductsSelect
          defaultValue={[]}
          options={products.map<TSelectOption>(({ slug, title }: TProduct) => ({
            label: title,
            value: slug,
          }))}
        />
      )}
    </FormLayout>
  );
};

export { CreateCategory };
