const SHOP_CLOSED_MESSAGE = "Teď máme zavřeno";
const SHOP_CLOSED_TITLE = "Teď máme zavřeno.";
const SHOP_CLOSED_EVENT = "shop:closed";

const dispatchShopClosed = (): void => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SHOP_CLOSED_EVENT));
};

export { dispatchShopClosed, SHOP_CLOSED_EVENT, SHOP_CLOSED_MESSAGE, SHOP_CLOSED_TITLE };
