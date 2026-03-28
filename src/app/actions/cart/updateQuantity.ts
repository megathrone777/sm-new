"use server";
const updateQuantity = async (
  id: TProduct["id"],
  quantity: TProduct["quantity"],
): Promise<void> => {
  console.log(id, quantity);
  // const idx = cart.products.findIndex((p) => p.id === id);
  // if (idx === -1) return;
  // if (quantity <= 0) cart.products.splice(idx, 1);
  // else cart.products[idx].quantity = quantity;
  //   const { id, quantity } = await req.json();
  //   const sid = getOrCreateSessionId();
  //   const key = `cart:${sid}`;
  //   const cart = await ensureCart(key);

  //   setQuantity(cart, id, quantity);
  //   await saveCart(key, cart);
};

export { updateQuantity };
