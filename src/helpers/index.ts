import { getAdditionalById, getAdditionals } from "./additionals";
import { getUser, getSession, getUsers } from "./auth";
import { getCart, getSessionIdAndCreateIfMissing, getSessionId } from "./cart";
import { getClientByPhone, getClients } from "./clients";
import { getModifierById, getModifiers } from "./modifiers";
import { getOrderById, getOrders, getOrdersByPhone } from "./orders";
import { getCategories, getCategoryById, getProductBySlug, getProducts } from "./products";
import {
  getOrdersByPromocode,
  getPromocodeByCode,
  getPromocodes,
  isPromocodeActive,
} from "./promocodes";
import { getSettings } from "./shop";
import { getSubmodifierById, getSubmodifiers } from "./submodifiers";

const additionalsHelpers = {
  getAdditionalById,
  getAdditionals,
};

const clientsHelpers = {
  getClientByPhone,
  getClients,
};

const promocodesHelpers = {
  getOrdersByPromocode,
  getPromocodeByCode,
  getPromocodes,
  isPromocodeActive,
};

const authHelpers = {
  getSession,
  getUser,
  getUsers,
};

const cartHelpers = {
  getCart,
  getSessionId,
  getSessionIdAndCreateIfMissing,
};

const modifiersHelpers = {
  getModifierById,
  getModifiers,
};

const ordersHelpers = {
  getOrderById,
  getOrders,
  getOrdersByPhone,
};

const productsHelpers = {
  getCategories,
  getCategoryById,
  getProductBySlug,
  getProducts,
};

const shopHelpers = {
  getSettings,
};

const submodifiersHelpers = {
  getSubmodifierById,
  getSubmodifiers,
};

export {
  additionalsHelpers,
  authHelpers,
  cartHelpers,
  clientsHelpers,
  modifiersHelpers,
  ordersHelpers,
  productsHelpers,
  promocodesHelpers,
  shopHelpers,
  submodifiersHelpers,
};
