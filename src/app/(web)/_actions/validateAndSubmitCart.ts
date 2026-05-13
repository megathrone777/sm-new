"use server";
import moment from "moment-timezone";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { sendOrderConfirmation } from "@/emailTemplate/sendOrderConfirmation";
import { sendOrderCreatedSms } from "@/sms/sendOrderCreatedSms";
import { realtime, store } from "@/store";
import { isMissedStreetNumber } from "@/utils";

import { saveCart } from "./saveCart";

const CART_COOKIE = "sid";

const validateAndSubmitCart = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<null | TActionResult> => {
  const [cartSessionId, storedCart, deliveryConditions, { lastTimeForPickup }] = await Promise.all([
    store.cart.getSessionId(),
    store.cart.get(),
    store.deliveryConditions.getAll(),
    store.shop.getSettings(),
  ]);

  if (!cartSessionId || !storedCart) return null;

  const name = `${formData.get("name") ?? ""}`.trim();
  const email = `${formData.get("email") ?? ""}`.trim();
  const phoneNumber = `${formData.get("phone") ?? ""}`.replace(/\D/g, "");
  const note = `${formData.get("note") ?? ""}`;
  const paymentTypeRaw = `${formData.get("payment") ?? ""}`;
  const paymentType: TPaymentType = (
    ["card", "cardAfterDelivery", "cash"] as TPaymentType[]
  ).includes(paymentTypeRaw as TPaymentType)
    ? (paymentTypeRaw as TPaymentType)
    : storedCart.payment.type;
  const changeRaw = `${formData.get("change") ?? ""}`;
  const change: TCart["payment"]["change"] =
    paymentType === "cash" && (changeRaw === "2000" || changeRaw === "5000")
      ? (+changeRaw as TCart["payment"]["change"])
      : null;

  const cart: TCart = {
    ...storedCart,
    client: { ...storedCart.client, email, name, phoneNumber },
    note,
    payment: { change, type: paymentType },
  };
  const {
    additionals,
    client,
    cutlery,
    delivery,
    payment,
    products,
    promo,
    time,
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

  const checkVicinityOpened = (): boolean => {
    const format: string = "hh:mm";
    const currentTime = moment(moment(), format);
    const startTime = moment("11:00", format);
    const lastTime = moment(lastTimeForPickup, format);

    return currentTime.isBetween(startTime, lastTime);
  };

  if (delivery.type === "pickup" && !checkVicinityOpened()) {
    errors.pickup = `Po času ${moment(lastTimeForPickup, "HH:mm").format(
      "HH:mm",
    )}, vyzvednutí je možné jenom na provozovně Milicova 25, Praha 3`;
  }

  if (delivery.type === "delivery" && delivery.address && !isMissedStreetNumber(delivery.address)) {
    const relatedConditions = deliveryConditions.find(
      (item) => item.distanceFrom < delivery.distanceInM && delivery.distanceInM <= item.distanceTo,
    );

    if (!relatedConditions) {
      errors.addressRange = "Adresa mimo rozsah rozvozu";
    } else if (relatedConditions.minimumOrderPrice > totalPrice) {
      errors.delivery = relatedConditions.text;
    }
  }

  if (cutlery.quantity === 0) {
    errors.cutlery = "Zvolte množství příboru na osobu, minimálně 1";
  }

  if (
    time.value !== null &&
    moment(new Date()).diff(`${moment().format("YYYY-MM-DD")} ${time.value}`, "m") * -1 < 60
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

  if (
    (!delivery.address || isMissedStreetNumber(delivery.address)) &&
    delivery.type === "delivery"
  ) {
    errors.addressFormat = "Vyplňte adresu s směrovacím nebo popisném číslem";
  }

  if (!!Object.keys(errors).length) {
    await saveCart({ client, errors, note, payment });
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
  const orderAdditionals: TOrderAdditional[] = additionals.filter(
    ({ quantity }: TCartAdditional): boolean => quantity > 0,
  );

  const orderNote =
    payment.type === "cash" && payment.change
      ? [note, `Mám v hotovosti ${payment.change} Kč`].filter(Boolean).join("\n")
      : note;

  const order: TOrder = {
    additionals: orderAdditionals,
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
    deliveryCoordinates:
      delivery.position && delivery.position.length > 0
        ? (delivery.position[delivery.position.length - 1] as unknown as [number, number]).join(",")
        : "",
    deliveryDistance: delivery.distanceInM,
    deliveryPrice: delivery.price ?? 0,
    deliveryTime: time.value ?? "",
    deliveryTitle: delivery.title,
    deliveryType: delivery.type,
    id,
    note: orderNote,
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

  await store.orders.registerNewOrder(order, cartSessionId);
  (await cookies()).delete(CART_COOKIE);

  after(async (): Promise<void> => {
    realtime.emit("newOrder", { createdAt: Date.now(), id, order, updatedAt: Date.now() });
    if (payment.type === "card") return;
    await Promise.allSettled([sendOrderConfirmation(order), sendOrderCreatedSms(order)]);
  });

  if (payment.type === "card") {
    redirect(`/payment-gateway/${id}`);
  }

  redirect(`/order-confirmed/${id}`);
};

export { validateAndSubmitCart };
