import { additionalsStore } from "@/store";

const getAdditionalById = (id: number): Promise<null | TAdditional> => additionalsStore.getById(id);

export { getAdditionalById };
