import { modifiersStore } from "@/store";

const getModifiers = (): Promise<TModifier[]> => modifiersStore.getAll();

export { getModifiers };
