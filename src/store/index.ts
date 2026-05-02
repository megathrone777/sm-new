import { Redis } from "@upstash/redis";

import { additionals } from "./additionals";
import { cartStore } from "./cart";
import { categoriesStore } from "./categories";
import { clientsStore } from "./clients";
import { modifiersStore } from "./modifiers";
import { ordersStore } from "./orders";
import { productsStore } from "./products";
import { promocodesStore } from "./promocodes";
import { sessionsStore } from "./sessions";
import { submodifiersStore } from "./submodifiers";
import { usersStore } from "./users";

const redis = new Redis({
  token: process.env.APP_KV_REST_API_TOKEN,
  url: process.env.APP_KV_REST_API_URL,
});

const store = {
  additionals,
  cart,
  categories,
  clients,
  modifiers,
  orders,
  products,
  promocodes: promocodesStore,
  sessions: sessionsStore,
  submodifiers: submodifiersStore,
  users: usersStore,
};

export {
  additionals,
  cartStore,
  categoriesStore,
  clientsStore,
  modifiersStore,
  ordersStore,
  productsStore,
  promocodesStore,
  sessionsStore,
  store,
  submodifiersStore,
  usersStore,
};
export { redis };
