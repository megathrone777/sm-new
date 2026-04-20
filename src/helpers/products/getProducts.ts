import { productsStore } from "@/store";

const getProducts = (): Promise<TProduct[]> => productsStore.getAll();

export { getProducts };
