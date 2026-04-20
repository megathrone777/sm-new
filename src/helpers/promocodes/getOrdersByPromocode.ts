import { ordersStore } from "@/store";

const getOrdersByPromocode = (
  code: string,
  offset = 0,
  limit = 50,
): Promise<TOrder[]> => ordersStore.getByPromocode(code, offset, limit);

export { getOrdersByPromocode };
