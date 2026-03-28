"use server";
import { getCart, getProductById } from "~/helpers";
import { save } from "./_save";

const addProduct = async (formData: FormData): Promise<{ success: boolean }> => {
  const id = formData.get("id");
  const product = await getProductById(`${id}`);
  const cart = await getCart();

  if (cart && id && product) {
    const newCart: TCart = { ...cart };
    const foundIndex: number = newCart.products.findIndex(
      ({ id }: TProduct): boolean => id === product.id,
    );

    if (foundIndex === -1) {
      newCart.products = [...newCart.products, { ...product, quantity: 1 }];
    } else {
      newCart.products[foundIndex].quantity += 1;
    }

    await save(newCart);

    return { success: true };
  }

  return { success: false };
};

export { addProduct };
