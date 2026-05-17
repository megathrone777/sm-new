import { store } from "@/store";

import { sendSms } from "./sendSms";

const interpolate = (template: string, vars: Record<string, string>): string =>
  Object.entries(vars).reduce<string>(
    (text: string, [key, value]: [string, string]): string => text.replaceAll(key, value),
    template,
  );

const pickTemplateKey = (order: TOrder, status: TOrderStatus): null | TSmsTemplateKey => {
  if (status === "ready" && order.deliveryType === "pickup") return "orderIsReadyToPickup";
  if (status === "took") return "orderIsOnTheWay";

  return null;
};

const sendOrderStatusSms = async (order: TOrder, status: TOrderStatus): Promise<boolean> => {
  const key = pickTemplateKey(order, status);

  if (!key || !order.clientPhoneNumber) return false;

  const [templates, { address }] = await Promise.all([
    store.smsTemplates.getAll(),
    store.shop.getSettings(),
  ]);
  const text = interpolate(templates[key], {
    "#orderId": `#${order.id}`,
    orderDeliveryTime: order.deliveryTime
      ? order.deliveryTime
      : "",
    orderPickupAddress: address,
  });

  return sendSms({ number: order.clientPhoneNumber, text });
};

export { sendOrderStatusSms };
