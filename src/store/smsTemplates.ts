import { redis } from "./redis";

const SMS_TEMPLATES_KEY = "sms:templates";

const smsTemplateKeys: TSmsTemplateKey[] = [
  "newOrderDelivery",
  "newOrderDeliveryCustomDeliveryTime",
  "newOrderPickup",
  "newOrderPickupCustomDeliveryTime",
  "orderIsOnTheWay",
  "orderIsReadyToPickup",
];

const defaultTemplates: TSmsTemplates = {
  newOrderDelivery: `
    Děkujeme za Vaši objednávku #orderId
    Doprava od 20 do 90 min.
    Podpora: +420792745116
  `,
  newOrderDeliveryCustomDeliveryTime: `
    Děkujeme za Vaši objednávku #orderId
    Doprava v orderDeliveryTime
    Podpora: +420792745116
  `,
  newOrderPickup: `
    Děkujeme za Vaši objednávku #orderId
    Připravíme od 20 do 60 min.
    Adresa: orderPickupAddress
    Podpora: +420792745116
  `,
  newOrderPickupCustomDeliveryTime: `
    Děkujeme za Vaši objednávku #orderId
    Připravíme v orderDeliveryTime
    Adresa: orderPickupAddress
    Podpora: +420792745116
  `,
  orderIsOnTheWay: `
    Kurýr vyzvedl objednávku #orderId, a už na cestě k Vám.
    Nechte recenze na Google: https://g.page/r/CdobvlNd2i7rEBM/review
    Prejeme Vam dobrou chut <3
  `,
  orderIsReadyToPickup: `
    Objednávka #orderId připravena k vyzvednutí, a čeká na Vás.
    Pro vyzvednutí, volejte: +420725796467
    Prejeme Vam dobrou chut <3
  `,
};

const smsTemplates = {
  getAll: async (): Promise<TSmsTemplates> => {
    const overrides = await redis.hgetall<Record<TSmsTemplateKey, string>>(SMS_TEMPLATES_KEY);

    return smsTemplateKeys.reduce<TSmsTemplates>(
      (accumulator: TSmsTemplates, key: TSmsTemplateKey): TSmsTemplates => ({
        ...accumulator,
        [key]: overrides?.[key] ?? defaultTemplates[key],
      }),
      {} as TSmsTemplates,
    );
  },

  set: async (key: TSmsTemplateKey, text: string): Promise<void> => {
    await redis.hset(SMS_TEMPLATES_KEY, { [key]: text });
  },

  smsTemplateKeys,
};

export { smsTemplates };
