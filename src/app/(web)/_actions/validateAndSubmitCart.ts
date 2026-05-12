"use server";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { realtime, store } from "@/store";
import { isMissedStreetNumber } from "@/utils";

import { saveCart } from "./saveCart";

const CART_COOKIE = "sid";

const validateAndSubmitCart = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<null | TActionResult> => {
  const [storedCart, { deliveryConditions, lastTimeForPickup: _ }] = await Promise.all([
    store.cart.get(),
    store.shop.getSettings(),
  ]);

  if (!storedCart) return null;

  const name = `${formData.get("name") ?? ""}`.trim();
  const email = `${formData.get("email") ?? ""}`.trim();
  const phoneNumber = `${formData.get("phone") ?? ""}`.replace(/\D/g, "");
  const note = `${formData.get("note") ?? ""}`;

  const cart: TCart = {
    ...storedCart,
    client: { ...storedCart.client, email, name, phoneNumber },
    note,
  };
  const {
    additionals,
    client,
    cutlery,
    delivery,
    payment,
    products,
    promo,
    tips,
    totalPrice,
  } = cart;
  const errors: TCart["errors"] = {};

  const isEmailValid = (email: string): null | RegExpMatchArray => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  // TODO
  // const checkVicinityOpened = (): boolean => {
  //   const format: string = "hh:mm";
  //   const currentTime = moment(moment(), format);
  //   const startTime = moment("11:00", format);
  //   const lastTime = moment(lastTimeForPickup, format);

  //   return currentTime.isBetween(startTime, lastTime);
  // };

  // if (delivery.type === "pickup" && !checkVicinityOpened()) {
  //   errors.pickup = `Po času ${moment(lastTimeForPickup, "HH:mm").format(
  //     "HH:mm",
  //   )}, vyzvednutí je možné jenom na provozovně Milicova 25, Praha 3`;
  // }

  if (delivery.type === "delivery") {
    const relatedConditions = deliveryConditions.find(
      (item) => item.distanceFrom < delivery.distanceInM && delivery.distanceInM <= item.distanceTo,
    );

    if (relatedConditions) {
      if (relatedConditions.minimumOrderPrice > totalPrice) {
        errors.delivery = relatedConditions.text;
      }
    }
  }

  if (cutlery.quantity === 0) {
    errors.cutlery = "Zvolte množství příboru na osobu, minimálně 1";
  }

  if (
    delivery.time.value !== null &&
    moment(new Date()).diff(`${moment().format("YYYY-MM-DD")} ${delivery.time.value}`, "m") * -1 <
      60
  ) {
    const message =
      delivery.type === "delivery"
        ? "Zvoleny čas doručené musí být více než 60 minut od aktuálního času"
        : "Zvoleny čas vyzvednutí musí být více než 60 minut od aktuálního času";

    errors.deliveryTime = message;
  }

  if (!client.name) {
    errors.name = "Vyplňte Jmeno";
  }

  if (!client.email) {
    errors.email = "Vyplňte Email";
  }

  if (!client.phoneNumber || !/^\d{7,15}$/.test(client.phoneNumber)) {
    errors.phone = "Vyplňte telefonní číslo ve formátu (+xxx xxx xxx xxx)";
  }

  if (!isEmailValid(client.email)) {
    errors.email = "Vyplňte validní Email";
  }

  if (!delivery.address && delivery.type === "delivery") {
    errors.streetNumber = "Vyplňte adresu s směrovacím nebo popisném číslem";
  }

  if (isMissedStreetNumber(delivery.address) && delivery.type === "delivery") {
    errors.addressFormat = "Vyplňte adresu s směrovacím nebo popisném číslem";
  }

  if (
    Object.keys(errors).some((type): boolean => type === "streetNumber" || type === "delivery") &&
    delivery.type === "delivery"
  ) {
    errors.addressRange = "Adresa mimo rozsah rozvozu";
  }

  if (!!Object.keys(errors).length) {
    await saveCart({ client, errors, note });
    revalidatePath("/cart");
    redirect("/cart", "replace");
  }

  const freeCutleryQuantity = products.reduce<number>(
    (accumulator, { freeCutleryCount, quantity }: TCartProduct) =>
      accumulator + freeCutleryCount * quantity,
    0,
  );
  const cutleryCountToPay: number = Math.max(0, cutlery.quantity - freeCutleryQuantity);
  const totalProductsPrice: number = products.reduce<number>(
    (accumulator, { totalPrice }: TCartProduct) => accumulator + totalPrice,
    0,
  );
  const totalAdditionalsPrice: number = additionals.reduce<number>(
    (accumulator, { totalPrice }: TCartAdditional) => accumulator + totalPrice,
    0,
  );
  const { existingOrderIds, id } = await store.orders.getExistingOrder(client.phoneNumber);

  const order: TOrder = {
    clientEmail: client.email,
    clientName: client.name,
    clientOrdersCount: existingOrderIds.length + 1,
    clientPhoneNumber: client.phoneNumber,
    comgateProcessedAt: "",
    comgateTransId: "",
    courier: "",
    createdAt: moment().toISOString(),
    cutleryCount: cutlery.quantity,
    cutleryCountToPay,
    cutleryPrice: cutlery.totalPrice,
    deliveryAddress: delivery.address,
    deliveryAddressDistrict: "",
    deliveryCoordinates: delivery.position
      ? `${delivery.position.lat},${delivery.position.lng}`
      : "",
    deliveryDistance: delivery.distanceInM,
    deliveryPrice: delivery.price ?? 0,
    deliveryTime: delivery.time.value ?? "",
    deliveryTitle: delivery.title,
    deliveryType: delivery.type,
    id,
    note,
    onlinePaymentStatus: null,
    paymentType: payment.type,
    products,
    promocode: promo.code,
    promocodeDiscountPrice: promo.discount,
    status: "new",
    timeout: 0,
    tipsAmount: tips.percentage,
    tipsPrice: tips.price,
    totalAdditionalsPrice,
    totalPrice,
    totalProductsPrice,
  };
  const cartSessionId = await store.cart.getSessionId();

  await store.orders.registerNewOrder(order, cartSessionId);
  (await cookies()).delete(CART_COOKIE);
  revalidatePath("/", "layout");

  after((): void => {
    realtime
      .channel("notification")
      .emit("notification.newOrder", { createdAt: Date.now(), updatedAt: Date.now() });
  });
  redirect(`/order-confirmed/${id}`);
};

export { validateAndSubmitCart };
