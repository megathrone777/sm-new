import { additionals } from "./additionals";
import { cart } from "./cart";
import { categories } from "./categories";
import { clients } from "./clients";
import { modifiers } from "./modifiers";
import { orders } from "./orders";
import { products } from "./products";
import { promocodes } from "./promocodes";
import { sessions } from "./sessions";
import { shop } from "./shop";
import { submodifiers } from "./submodifiers";
import { users } from "./users";

const store = {
  additionals,
  cart,
  categories,
  clients,
  modifiers,
  orders,
  products,
  promocodes,
  sessions,
  shop,
  submodifiers,
  users,
};

export { realtime, type RealtimeEvents } from "./realtime";
export { redis } from "./redis";
export { store };
