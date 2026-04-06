import React from "react";

import { updateProduct } from "@/app/(auth)/(admin)/_actions";
import {
  CategorySelect,
  ModifiersSelect,
  Header,
  ImageUploader,
} from "@/app/(auth)/(admin)/_components";
import { FormLayout } from "@/app/(auth)/(admin)/_components";
import { modifiersHelpers, productsHelpers } from "@/helpers";
import { Checkbox, Input } from "@/ui";

import { formClass } from "./page.css";

const Page: React.FC<PageProps<"/admin/product/[slug]">> = async ({ params }) => {
  const { slug } = await params;
  const [product, modifiers, categories] = await Promise.all([
    productsHelpers.getProductBySlug(slug),
    modifiersHelpers.getModifiers(),
    productsHelpers.getCategories(),
  ]);

  if (!product) return <Header title="Product not found" />;

  const assignedModifierIds = product.modifiers.map<string>(({ id }: TModifier) => `${id}`);
  const categoryOptions = categories
    .filter(({ id }: TProductCategory) => id !== 0)
    .map<TSelectOption>(({ id, title }: TProductCategory) => ({
      label: title,
      value: `${id}`,
    }));

  return (
    <>
      <Header title={`Product | ${product.title}`} />

      <FormLayout
        formAction={updateProduct}
        layoutClassName={formClass}
      >
        <input
          name="slug"
          type="hidden"
          value={product.slug}
        />

        <input
          name="id"
          type="hidden"
          value={product.id}
        />

        <input
          name="sortOrder"
          type="hidden"
          value={product.sortOrder}
        />

        <ImageUploader initialUrl={product.imageUrl} />
        <div />

        <CategorySelect
          defaultValue={product.categoryId}
          options={categoryOptions}
        />

        <Input
          defaultValue={product.title}
          label="Title"
          name="title"
          type="text"
        />

        <Input
          defaultValue={product.price}
          label="Price (Kč)"
          name="price"
          type="number"
        />

        <Input
          defaultValue={product.weight}
          label="Weight"
          name="weight"
          type="text"
        />

        <Input
          defaultValue={product.composition}
          label="Composition"
          name="composition"
          type="text"
        />

        <Input
          defaultValue={product.allergens ?? ""}
          label="Allergens"
          name="allergens"
          type="text"
        />

        <Input
          defaultValue={product.description ?? ""}
          label="Description"
          name="description"
          type="text"
        />

        <Input
          defaultValue={product.modifiersTitle ?? ""}
          label="Modifiers title"
          name="modifiersTitle"
          type="text"
        />

        <Checkbox
          defaultChecked={product.isAvailable}
          label="Available"
          name="isAvailable"
          type="checkbox"
        />

        <Checkbox
          defaultChecked={product.requiredModifier}
          label="Required modifier"
          name="requiredModifier"
          type="checkbox"
        />

        <ModifiersSelect
          defaultValue={assignedModifierIds}
          options={modifiers.map<TSelectOption>(({ id, price, title }: TModifier) => ({
            label: `${title}${price !== 0 ? ` +${price} Kč` : ""}`,
            value: String(id),
          }))}
        />

        <input
          name="isTopProduct"
          type="hidden"
          value={String(product.isTopProduct)}
        />

        <input
          name="freeCutleryCount"
          type="hidden"
          value={product.freeCutleryCount}
        />

        <input
          name="requiredCutlery"
          type="hidden"
          value={String(product.requiredCutlery)}
        />

        <input
          name="fbUpload"
          type="hidden"
          value={String(product.fbUpload)}
        />
        <input
          name="fbDescription"
          type="hidden"
          value={product.fbDescription ?? ""}
        />

        <input
          name="fbCategoryId"
          type="hidden"
          value={product.fbCategoryId ?? ""}
        />

        <input
          name="googleCategoryId"
          type="hidden"
          value={product.googleCategoryId ?? ""}
        />

        <input
          name="isMultipleModifiers"
          type="hidden"
          value={String(product.isMultipleModifiers)}
        />

        <input
          name="isPromotionActive"
          type="hidden"
          value={String(product.isPromotionActive)}
        />

        <input
          name="promotionDiscountAmount"
          type="hidden"
          value={product.promotionDiscountAmount}
        />

        <input
          name="promotionForEveryXProducts"
          type="hidden"
          value={product.promotionForEveryXProducts}
        />
      </FormLayout>
    </>
  );
};

export { metadata } from "./metadata";
export default Page;
