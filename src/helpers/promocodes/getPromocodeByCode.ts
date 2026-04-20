import { promocodesStore } from "@/store";

const getPromocodeByCode = (
  code: string,
): Promise<null | Record<string, TPromoCode>> => promocodesStore.getByCode(code);

export { getPromocodeByCode };
