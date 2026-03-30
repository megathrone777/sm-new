"use server";
import { getCart, getProductBySlug } from "@/helpers";

const addProduct = async (formData: FormData): Promise<void> => {
  const slug = formData.get("slug");

  if (slug) {
    const product = await getProductBySlug(`${slug}`);

    if (product) {
      const cart = await getCart();
      const newCart: TCart = { ...cart };
      const foundIndex: number = newCart.products.findIndex(
        ({ id }: TProduct): boolean => id === product.id,
      );

      if (foundIndex === -1) {
        newCart.products = [...newCart.products, { ...product, quantity: 1 }];
      } else {
        newCart.products[foundIndex].quantity += 1;
      }

      // await save(newCart);

      return { success: true };
    }
  }

  return { success: false };
};

export { addProduct };
