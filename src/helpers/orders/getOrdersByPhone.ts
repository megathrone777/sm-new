import { ordersStore } from "@/store";

const getOrdersByPhone = (
  phoneNumber: string,
  offset = 0,
  limit = 20,
): Promise<TOrder[]> => ordersStore.getByPhone(phoneNumber, offset, limit);

export { getOrdersByPhone };
