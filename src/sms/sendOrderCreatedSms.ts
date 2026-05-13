import moment from "moment";

import { store } from "@/store";

import { sendSms } from "./sendSms";

const interpolate = (template: string, vars: Record<string, string>): string =>
  Object.entries(vars).reduce<string>(
    (text: string, [key, value]: [string, string]): string => text.replaceAll(key, value),
    template,
  );

const pickTemplateKey = (order: TOrder): TSmsTemplateKey => {
  const hasCustomTime = Boolean(order.deliveryTime);

  if (order.deliveryType === "pickup") {
    return hasCustomTime ? "newOrderPickupCustomDeliveryTime" : "newOrderPickup";
  }

  return hasCustomTime ? "newOrderDeliveryCustomDeliveryTime" : "newOrderDelivery";
};

const sendOrderCreatedSms = async (order: TOrder): Promise<boolean> => {
  if (!order.clientPhoneNumber) return false;

  const [templates, { address }] = await Promise.all([
    store.smsTemplates.getAll(),
    store.shop.getSettings(),
  ]);
  const key = pickTemplateKey(order);
  const text = interpolate(templates[key], {
    "#orderId": `#${order.id}`,
    orderDeliveryTime: order.deliveryTime
      ? moment(order.deliveryTime, "HH:mm").format("HH:mm")
      : "",
    orderPickupAddress: address,
  });

  return sendSms({ number: order.clientPhoneNumber, text });
};

export { sendOrderCreatedSms };
