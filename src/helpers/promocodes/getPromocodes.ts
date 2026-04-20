import { promocodesStore } from "@/store";

const getPromocodes = (offset = 0, limit = 50): Promise<TPromoCode[]> =>
  promocodesStore.getAll(offset, limit);

export { getPromocodes };
