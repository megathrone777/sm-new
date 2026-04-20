import { categoriesStore } from "@/store";

const getCategoryById = (id?: TProductCategory["id"]): Promise<null | TProductCategory> =>
  categoriesStore.getById(id);

export { getCategoryById };
