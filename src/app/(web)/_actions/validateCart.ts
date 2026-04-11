"use server";
import moment from "moment";

import { shopHelpers } from "@/helpers/shop";
import { isMissedStreetNumber } from "@/utils";

const validateCart = async ({
  client,
  cutleryCount,
  delivery,
  totalPrice,
}: TCart): Promise<TCartError[]> => {
  const { deliveryConditions, lastTimeForPickup } = await shopHelpers.getSettings();
  const errors: TCartError[] = [];

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
    const startTime = moment("11:00", format);
    const lastTime = moment(lastTimeForPickup, format);

    return currentTime.isBetween(startTime, lastTime);
  };

  if (delivery.type === "pickup" && !checkVicinityOpened()) {
    errors.push({
      message: `Po času ${moment(lastTimeForPickup, "HH:mm").format(
        "HH:mm",
      )}, vyzvednutí je možné jenom na provozovně Milicova 25, Praha 3`,
      type: "pickup",
    });
  }

  if (delivery.type === "delivery") {
    const relatedConditions = deliveryConditions.find(
      (item) => item.distanceFrom < delivery.distanceInM && delivery.distanceInM <= item.distanceTo,
    );

    if (relatedConditions) {
      if (relatedConditions.minimumOrderPrice > totalPrice) {
        errors.push({
          message: relatedConditions.text,
          type: "delivery",
        });
      }
    }
  }

  if (cutleryCount === 0) {
    errors.push({
      message: "Zvolte množství příboru na osobu, minimálně 1",
      type: "cutleryCount",
    });
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

    errors.push({
      message,
      type: "deliveryTime",
    });
  }

  if (!client.name) {
    errors.push({ message: "Vyplňte Jmeno", type: "name" });
  }

  if (!client.email) {
    errors.push({ message: "Vyplňte Email", type: "email" });
  }

  if (
    !client.phoneNumber ||
    !`+${client.phoneNumber}`.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
  ) {
    errors.push({
      message: "Vyplňte telefonní číslo ve formátu (+xxx xxx xxx xxx)",
      type: "phone",
    });
  }

  if (!isEmailValid(client.email)) {
    errors.push({ message: "Vyplňte validní Email", type: "email" });
  }

  if (!delivery.address && delivery.type === "delivery") {
    errors.push({
      message: "Vyplňte adresu s směrovacím nebo popisném číslem",
      type: "streetNumber",
    });
  }

  if (isMissedStreetNumber(delivery.address) && delivery.type === "delivery") {
    errors.push({
      message: "Vyplňte adresu s směrovacím nebo popisném číslem",
      type: "streetNumber",
    });
  }

  if (
    errors.some(
      ({ type }: TCartError): boolean => type === "streetNumber" || type === "delivery",
    ) &&
    delivery.type === "delivery"
  ) {
    errors.push({
      message: "Adresa mimo rozsah rozvozu",
      type: "addressRange",
    });
  }

  return errors;
};

export { validateCart };
