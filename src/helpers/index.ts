import { getUser, getSession } from "./auth";
import { getCart, getSessionId } from "./cart";
import { getModifierById, getModifiers } from "./modifiers";
import { getCategories, getCategoryById, getProductBySlug, getProducts } from "./products";
import { getOrders, getSettings } from "./shop";
import { getSubmodifierById, getSubmodifiers } from "./submodifiers";

const authHelpers = {
  getSession,
  getUser,
};

const cartHelpers = {
  getCart,
  getSessionId,
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
  authHelpers,
  cartHelpers,
  modifiersHelpers,
  productsHelpers,
  shopHelpers,
  submodifiersHelpers,
};
