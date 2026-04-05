import React from "react";

import { createCategory } from "@/app/(auth)/(admin)/_actions";
import { FormLayout } from "@/app/(auth)/(admin)/_components";
import { productsHelpers } from "@/helpers";
import { Checkbox, Input } from "@/ui";

import { ProductsSelect } from "./ProductsSelect";

import { wrapperClass } from "./CreateCategory.css";

const CreateCategory: React.FC = async () => {
  const products = await productsHelpers.getProducts();

  return (
    <FormLayout
      className={wrapperClass}
      formAction={createModifier}
    >
      <Input
        label="New modifier title"
        name="title"
        placeholder="New modifier title"
        type="text"
      />

      <Input
        defaultValue="0"
        label="Price (Kč)"
        name="price"
        type="number"
      />

      <Input
        defaultValue="0"
        label="Sort order"
        name="sortOrder"
        type="number"
      />

      <Checkbox
        label="Required submodifier"
        name="requiredSubModifier"
        type="checkbox"
      />

      {products && !!products.length && (
        <ProductsSelect
          defaultValue={[]}
          // options={products.map<TSelectOption>(({ id, title }: TProduct) => ({
          //   label: title,
          //   value: `${id}`,
          // }))}
        />
      )}
    </FormLayout>
  );
};

export { CreateCategory };
