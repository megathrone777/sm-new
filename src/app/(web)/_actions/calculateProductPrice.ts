"use server";
const calculateProductPrice = async (
  basePrice: number,
  modifiers: TCartModifier[],
): Promise<number> => {
  const totalPrice = modifiers.reduce<number>(
    (accumulator, modifier) => accumulator + modifier.price,
    basePrice,
  );

  return totalPrice;
};

export { calculateProductPrice };
