import { additionalsStore } from "@/store";

const getAdditionals = (): Promise<TAdditional[]> => additionalsStore.getAll();

export { getAdditionals };
