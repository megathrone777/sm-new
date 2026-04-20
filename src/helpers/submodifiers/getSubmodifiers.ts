import { submodifiersStore } from "@/store";

const getSubmodifiers = (): Promise<TSubmodifier[]> => submodifiersStore.getAll();

export { getSubmodifiers };
