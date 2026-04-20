import { ordersStore } from "@/store";

const getOrderById = (id: number | string): Promise<null | TOrder> => ordersStore.getById(id);

export { getOrderById };
