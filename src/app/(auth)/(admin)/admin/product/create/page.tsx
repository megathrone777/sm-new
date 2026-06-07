import React from "react";

import { createProduct } from "@/app/(auth)/(admin)/_actions";
import {
  CategorySelect,
  FormLayout,
  Header,
  ImageUploader,
  ModifiersSelect,
} from "@/app/(auth)/(admin)/_components";
import { getTranslation } from "@/dictionaries";
import { store } from "@/store";
import { Checkbox, Input } from "@/ui";

import { formClass } from "./page.css";

const Page: React.FC<PageProps<"/admin/product/create">> = async () => {
  const [modifiers, categories] = await Promise.all([
    store.modifiers.getAll(),
    store.categories.getAll(),
  ]);

  const categoryOptions = categories
    .filter(({ id }: TProductCategory) => id !== 0)
    .map<TSelectOption>(({ id, title }: TProductCategory) => ({
      label: title,
      value: `${id}`,
    }));

  const modifiersOptions = modifiers.map<TSelectOption>(({ id, price, title }: TModifier) => ({
    label: `${title}${price !== 0 ? ` +${price} ${getTranslation<string>("currency")}` : ""}`,
    value: `${id}`,
  }));

  return (
    <>
      <Header title="Create product" />

      <FormLayout
        formAction={createProduct}
        layoutClassName={formClass}
      >
        <ImageUploader />

        <div />

        <CategorySelect
          defaultValue={
            categoryOptions[0] && categoryOptions[0].value ? +categoryOptions[0].value : 0
          }
          options={categoryOptions}
        />

        <Input
          label="Title"
          name="title"
          placeholder="Product title"
          type="text"
        />

        <Input
          defaultValue="0"
          label={`Price (${getTranslation<string>("currency")})`}
          name="price"
          type="number"
        />

        <Input
          label="Weight"
          name="weight"
          placeholder="e.g. 250g"
          type="text"
        />

        <Input
          label="Composition"
          name="composition"
          placeholder="Ingredients..."
          type="text"
        />

        <Input
          label="Allergens"
          name="allergens"
          placeholder="Optional"
          type="text"
        />

        <Input
          label="Description"
          name="description"
          placeholder="Optional"
          type="text"
        />

        <Input
          label="Modifiers title"
          name="modifiersTitle"
          placeholder="Optional"
          type="text"
        />

        <Checkbox
          defaultChecked
          label="Available"
          name="isAvailable"
          type="checkbox"
        />

        <Checkbox
          label="Required modifier"
          name="requiredModifier"
          type="checkbox"
        />

        <ModifiersSelect
          defaultValue={[]}
          options={modifiersOptions}
        />
      </FormLayout>
    </>
  );
};

export default Page;
