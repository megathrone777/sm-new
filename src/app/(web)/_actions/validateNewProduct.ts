"use server";
import { redirect } from "next/navigation";

const validateNewProduct = async ({
  addedFromList,
  modifiers,
  requiredModifier,
  slug,
  title,
}: TCartProduct): Promise<TActionResult> => {
  if (addedFromList && requiredModifier && modifiers.length === 0) {
    redirect(`/product/${slug}?requiredModifier=true`);
  }

  if (requiredModifier && modifiers.length === 0) {
    return { message: "Zvolte modifikátory", type: "error" };
  }

  if (
    modifiers.some(
      ({ requiredSubModifier, subModifier }: TCartModifier): boolean =>
        requiredSubModifier && !subModifier,
    )
  ) {
    return {
      message: "Zvolte modifikátory",
      type: "error",
    };
  }

  return {
    message: `${title} přidán do košíku`,
    type: "success",
  };
};

export { validateNewProduct };
