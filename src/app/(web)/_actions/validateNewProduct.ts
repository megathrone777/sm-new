"use server";
import { redirect } from "next/navigation";

import { SHOP_CLOSED_MESSAGE } from "@/app/(web)/_components/Controls/shopClosed";
import { store } from "@/store";
import { isShopOpened } from "@/utils";

const validateNewProduct = async ({
  modifiers,
  requiredModifier,
  slug,
  title,
}: TCartProduct): Promise<TActionResult> => {
  const { isAvailable, schedule } = await store.shop.getSettings();

  if (!isShopOpened(schedule, isAvailable)) {
    return { message: SHOP_CLOSED_MESSAGE, type: "error" };
  }

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
