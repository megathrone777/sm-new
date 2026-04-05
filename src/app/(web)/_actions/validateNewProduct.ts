"use server";
const validateNewProduct = async ({
  modifiers,
  requiredModifier,
  title,
}: TCartProduct): Promise<TActionResult> => {
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
