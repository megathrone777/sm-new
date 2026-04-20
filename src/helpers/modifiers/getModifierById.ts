import { modifiersStore } from "@/store";

const getModifierById = (id: number): Promise<null | TModifier> => modifiersStore.getById(id);

export { getModifierById };
