import { about } from "./about";
import { additionals } from "./additionals";
import { cart } from "./cart";
import { categories } from "./categories";
import { clients } from "./clients";
import { deliveryConditions } from "./deliveryConditions";
import { modifiers } from "./modifiers";
import { orders } from "./orders";
import { products } from "./products";
import { promocodes } from "./promocodes";
import { reviews } from "./reviews";
import { sessions } from "./sessions";
import { shop } from "./shop";
import { smsTemplates } from "./smsTemplates";
import { submodifiers } from "./submodifiers";
import { users } from "./users";

const store = {
  about,
  additionals,
  cart,
  categories,
  clients,
  deliveryConditions,
  modifiers,
  orders,
  products,
  promocodes,
  reviews,
  sessions,
  shop,
  smsTemplates,
  submodifiers,
  users,
};

export { realtime, type RealtimeEvents } from "./realtime";
export { redis } from "./redis";
export { store };
