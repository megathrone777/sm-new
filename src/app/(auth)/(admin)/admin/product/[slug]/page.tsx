import React from "react";
import Form from "next/form";

import { updateProduct } from "@/app/(auth)/(admin)/_actions";
import { Header } from "@/app/(auth)/(admin)/_components";
import { modifiersHelpers, productsHelpers } from "@/helpers";
import { Button, Input } from "@/ui";

import { ModifiersSelect } from "./_components/ModifiersSelect";

import { formFooterClass, formLayoutClass } from "./page.css";

const Page: React.FC<PageProps<"/admin/product/[slug]">> = async ({ params }) => {
  const { slug } = await params;
  const [product, modifiers] = await Promise.all([
    productsHelpers.getProductBySlug(slug),
    modifiersHelpers.getModifiers(),
  ]);

  if (!product)
    return (
      <>
        <p>Product not found</p>
      </>
    );

  const assignedModifierIds = product.modifiers.map(({ id }) => String(id));

  return (
    <>
      <Header title={product.title} />

      <Form action={updateProduct}>
        <div className={formFooterClass}>
          <Button
            template="small"
            type="submit"
          >
            Save
          </Button>
        </div>

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
          name="categoryId"
          type="hidden"
          value={product.categoryId}
        />

        <input
          name="sortOrder"
          type="hidden"
          value={product.sortOrder}
        />

        <input
          name="imageUrl"
          type="hidden"
          value={product.imageUrl}
        />

        <div className={formLayoutClass}>
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

          <label>
            <input
              defaultChecked={product.isAvailable}
              name="isAvailable"
              type="checkbox"
            />{" "}
            <span>Available</span>
          </label>

          <label>
            <input
              defaultChecked={product.requiredModifier}
              name="requiredModifier"
              type="checkbox"
            />{" "}
            Required modifier
          </label>

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

          <ModifiersSelect
            defaultValue={assignedModifierIds}
            options={modifiers.map(({ id, price, title }: TModifier) => ({
              label: `${title}${price !== 0 ? ` +${price} Kč` : ""}`,
              value: String(id),
            }))}
          />
        </div>
      </Form>
    </>
  );
};

export default Page;
