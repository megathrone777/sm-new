import { getOrdersByPromocode } from "./getOrdersByPromocode";
import { getPromocodeByCode } from "./getPromocodeByCode";
import { getPromocodes } from "./getPromocodes";
import { isPromocodeActive } from "./isPromocodeActive";

const promocodesHelpers = { getOrdersByPromocode, getPromocodeByCode, getPromocodes, isPromocodeActive };

export { promocodesHelpers };
