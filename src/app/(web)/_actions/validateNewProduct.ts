"use server";
import { redirect } from "next/navigation";

const validateNewProduct = async ({
  modifiers,
  requiredModifier,
  slug,
  title,
}: TCartProduct): Promise<TActionResult> => {
  if (requiredModifier && modifiers.length === 0) {
    redirect(`/product/${slug}?requiredModifier=true`);
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
