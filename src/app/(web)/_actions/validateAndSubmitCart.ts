"use server";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { cartHelpers } from "@/helpers/cart";
import { shopHelpers } from "@/helpers/shop";
import { isMissedStreetNumber } from "@/utils";

import { saveCart } from "./saveCart";

const validateAndSubmitCart = async (): Promise<void> => {
  const cart = await cartHelpers.getCart();

  if (!cart) return;

  const { client, cutlery, delivery, totalPrice } = cart;
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

  if (!client.phoneNumber || !`+${client.phoneNumber}`.match(/^\+\d{7,15}$/)) {
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
};

export { validateAndSubmitCart };
