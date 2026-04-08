import { getAdditionalById, getAdditionals } from "./additionals";
import { getUser, getSession, getUsers } from "./auth";
import { getCart, getSessionIdAndCreateIfMissing, getSessionId } from "./cart";
import { getModifierById, getModifiers } from "./modifiers";
import { getCategories, getCategoryById, getProductBySlug, getProducts } from "./products";
import { getOrders, getSettings } from "./shop";
import { getSubmodifierById, getSubmodifiers } from "./submodifiers";

const additionalsHelpers = {
  getAdditionalById,
  getAdditionals,
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

const productsHelpers = {
  getCategories,
  getCategoryById,
  getProductBySlug,
  getProducts,
};

const shopHelpers = {
  getOrders,
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
  modifiersHelpers,
  productsHelpers,
  shopHelpers,
  submodifiersHelpers,
};
