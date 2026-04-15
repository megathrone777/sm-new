const getProductPrice = (basePrice: number, modifiers: TCartModifier[]): number => {
  const totalPrice = modifiers.reduce<number>(
    (accumulator, modifier) => accumulator + modifier.price,
    basePrice,
  );

  return totalPrice;
};

export { getProductPrice };
