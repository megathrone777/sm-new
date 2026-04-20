import { ordersStore } from "@/store";

const getOrders = (offset = 0, limit = 10): Promise<TOrder[]> => ordersStore.getAll(offset, limit);

export { getOrders };
