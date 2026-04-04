import { getSession } from "./auth";
import { getCart, getOrCreateSessionId } from "./cart";
import { getCategories, getCategoryById, getProductBySlug, getProducts } from "./products";
import { getOrders, getSettings } from "./shop";

const authHelpers = {
  getSession,
};

const cartHelpers = {
  getCart,
  getOrCreateSessionId,
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

export { authHelpers, cartHelpers, productsHelpers, shopHelpers };
