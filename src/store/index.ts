import { additionalsStore } from "./additionals";
import { cartStore } from "./cart";
import { categoriesStore } from "./categories";
import { clientsStore } from "./clients";
import { modifiersStore } from "./modifiers";
import { ordersStore } from "./orders";
import { productsStore } from "./products";
import { promocodesStore } from "./promocodes";
import { redis } from "./redis";
import { sessionsStore } from "./sessions";
import { submodifiersStore } from "./submodifiers";
import { usersStore } from "./users";

const store = {
  additionals: additionalsStore,
  cart: cartStore,
  categories: categoriesStore,
  clients: clientsStore,
  modifiers: modifiersStore,
  orders: ordersStore,
  products: productsStore,
  promocodes: promocodesStore,
  sessions: sessionsStore,
  submodifiers: submodifiersStore,
  users: usersStore,
};

export { realtime, type RealtimeEvents } from "./realtime";
export {
  additionalsStore,
  cartStore,
  categoriesStore,
  clientsStore,
  modifiersStore,
  ordersStore,
  productsStore,
  promocodesStore,
  redis,
  sessionsStore,
  store,
  submodifiersStore,
  usersStore,
};
