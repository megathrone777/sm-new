"use server";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { cartHelpers } from "@/helpers/cart";
import { ordersHelpers } from "@/helpers/orders";
import { shopHelpers } from "@/helpers/shop";
import { redis } from "@/lib";
import { isMissedStreetNumber } from "@/utils";

import { saveCart } from "./saveCart";

const validateAndSubmitCart = async (): Promise<void> => {
  const cart = await cartHelpers.getCart();

  if (!cart) return;

  const {
    additionals,
    client,
    cutlery,
    delivery,
    note,
    payment,
    products,
    promo,
    tips,
    totalPrice,
  } = cart;
  const { deliveryConditions, lastTimeForPickup } = await shopHelpers.getSettings();
  const errors: TCart["errors"] = {};

  const isEmailValid = (email: string): null | RegExpMatchArray => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const checkVicinityOpened = (): boolean => {
    const format: string = "hh:mm";
    const currentTime = moment(moment(), format);
    const startTime = moment("04:00", format);
    const lastTime = moment(lastTimeForPickup, format);

    return currentTime.isBetween(startTime, lastTime);
  };

  if (delivery.type === "pickup" && !checkVicinityOpened()) {
    errors.pickup = `Po času ${moment(lastTimeForPickup, "HH:mm").format(
      "HH:mm",
    )}, vyzvednutí je možné jenom na provozovně Milicova 25, Praha 3`;
  }

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

  if (!client.phoneNumber || !/^\+\d{7,15}$/.test(client.phoneNumber)) {
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
    await saveCart({
      ...cart,
      errors,
    });
    revalidatePath("/cart");
    redirect("/cart#cart-cutlery", "replace");
  }

  // Create order
  const existingOrders = await ordersHelpers.getOrdersByPhone(client.phoneNumber);

  const freeCutleryQuantity = products.reduce(
    (acc, { freeCutleryCount, quantity }) => acc + freeCutleryCount * quantity,
    0,
  );
  const cutleryCountToPay = Math.max(0, cutlery.quantity - freeCutleryQuantity);

  const totalProductsPrice = products.reduce((acc, p) => acc + p.totalPrice, 0);
  const totalAdditionalsPrice = additionals.reduce((acc, a) => acc + a.totalPrice, 0);

  const [maxExistingId] = await redis.zrange("orders", 0, 0, { rev: true });

  if (maxExistingId) {
    await redis.set("orders:counter", Number(maxExistingId), { nx: true });
  }

  const id = await redis.incr("orders:counter");

  const order: TOrder = {
    clientEmail: client.email,
    clientName: client.name,
    clientOrdersCount: existingOrders.length + 1,
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
    onlinePaymentStatus: "" as TOnlinePaymentStatus,
    paymentType: payment.type,
    products: products as TOrderProduct[],
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

  await Promise.all([
    redis.hset(`order:${id}`, order as unknown as Record<string, unknown>),
    redis.zadd("orders", { member: String(id), score: id }),
    redis.zadd(`orders:phone:${client.phoneNumber}`, { member: String(id), score: id }),
    redis.hset(`client:${client.phoneNumber}`, {
      email: client.email,
      name: client.name,
      phoneNumber: client.phoneNumber,
    }),
    redis.zadd("clients", { member: client.phoneNumber, score: Date.now() }),
  ]);

  redirect(`/orderConfirmed/${id}`);
};

export { validateAndSubmitCart };
