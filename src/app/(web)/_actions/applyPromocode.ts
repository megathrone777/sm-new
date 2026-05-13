"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

const applyPromocode = async (formData: FormData): Promise<void> => {
  const cart = await store.cart.get();

  if (!cart) return;

  const code = `${formData.get("promo") ?? ""}`.trim().toUpperCase();

  if (!code) return;

  const { promo: _existing, ...errors } = cart.errors;

  const fail = async (message: string): Promise<void> => {
    await saveCart({
      errors: { ...errors, promo: message },
      promo: { code: "", discount: 0 },
    });
    revalidatePath("/cart");
  };

  const phoneInvalid = cart.client.phoneNumber.length === 0 || Boolean(cart.errors.phone);
  const addressInvalid =
    (cart.delivery.type === "delivery" && cart.delivery.address.length === 0) ||
    Boolean(cart.errors.addressFormat) ||
    Boolean(cart.errors.addressRange);

  if (phoneInvalid || addressInvalid) {
    return fail("Vyplňte adresu a telefonní číslo");
  }

  const record = (await store.promocodes.getByCode(code)) as unknown as null | TPromoCode;

  if (!record || !record.code) {
    return fail("Neplatný promo kód");
  }

  const isActive =
    `${record.isActive}` === "1" || record.isActive === true || `${record.isActive}` === "true";

  if (!isActive) {
    return fail("Promo kód není aktivní");
  }

  const activatedAt = record.activatedAt ? new Date(record.activatedAt) : null;

  if (activatedAt && !Number.isNaN(activatedAt.getTime()) && new Date() < activatedAt) {
    return fail("Promo kód není aktivní");
  }

  if (record.type === "oneTime" && +record.appliedCount > 0) {
    return fail("Promo kód již byl použit");
  }

  if (record.type === "reusable" && record.usability === "temporary") {
    const clientOrders = await store.orders.getByPhone(cart.client.phoneNumber, 0, 100);
    const alreadyUsed = clientOrders.some(({ promocode }) => promocode === code);

    if (alreadyUsed) {
      return fail("Promo kód jste již použili");
    }
  }

  // TODO: isLimitedBySchedule check requires a `schedule` field on TPromoCode
  // (items like { weekDay, timeFrom, timeTo }). Skipping until schedule is modeled.

  await saveCart({
    errors,
    promo: { code, discount: +record.discount },
  });
  revalidatePath("/cart");
};

export { applyPromocode };
