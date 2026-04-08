import React from "react";

import { updateCategory } from "@/app/(auth)/(admin)/_actions";
import {
  FormLayout,
  Header,
  ImageUploader,
  ProductsSelect,
} from "@/app/(auth)/(admin)/_components";
import { productsHelpers } from "@/helpers";
import { Input } from "@/ui";

import { formClass } from "./page.css";

const Page: React.FC<PageProps<"/admin/category/[id]">> = async ({ params }) => {
  const { id } = await params;
  const [category, allProducts] = await Promise.all([
    productsHelpers.getCategoryById(Number(id)),
    productsHelpers.getProducts(),
  ]);

  if (!category) return <Header title="Category not found" />;

  const assignedSlugs = allProducts
    .filter(({ categoryId }: TProduct): boolean => categoryId === category.id)
    .map(({ slug }: TProduct) => slug);

  const productOptions = allProducts.map<TSelectOption>(({ slug, title }: TProduct) => ({
    label: title,
    value: slug,
  }));

  return (
    <>
      <Header title={`Category | ${category.title}`} />

      <FormLayout
        formAction={updateCategory}
        layoutClassName={formClass}
      >
        <input
          name="id"
          type="hidden"
          value={category.id}
        />

        <ImageUploader initialUrl={category.imageUrl} />

        {category.sortOrder !== 0 && (
          <ProductsSelect
            defaultValue={assignedSlugs}
            options={productOptions}
          />
        )}

        <Input
          defaultValue={category.title}
          label="Title"
          name="title"
          type="text"
        />

        {category.id !== 0 && (
          <Input
            defaultValue={category.sortOrder}
            label="Sort order"
            name="sortOrder"
            type="number"
          />
        )}
      </FormLayout>
    </>
  );
};

export default Page;
