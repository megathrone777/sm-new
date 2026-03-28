"use server";
const removeProduct = async (productId: TProduct["id"]): Promise<void> => {
  console.log(productId);
  // const idx = cart.products.findIndex((p) => p.id === productId);
  // if (idx !== -1) cart.products.splice(idx, 1);
  //   const { id } = await req.json();
  //   const sid = getOrCreateSessionId();
  //   const key = `cart:${sid}`;

  //   const cart = await ensureCart(key);

  //   removeItem(cart, id);
  //   await saveCart(key, cart);
};

export { removeProduct };
