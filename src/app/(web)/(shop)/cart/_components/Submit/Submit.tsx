import React from "react";
import Form from "next/form";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import moment from "moment";
// import { scroller } from "react-scroll";

import { validateAndSubmitCart } from "@/app/(web)/_actions";
import { useTranslation } from "@/hooks";
import { Button } from "@/ui";

import { priceClass, wrapperClass } from "./Submit.css";

import type { TProps } from "./Submit.types";

const Submit: React.FC<TProps> = ({ totalPrice }) => {
  // const [state, action, pending] = useActionState(formAction, null);
  const { t } = useTranslation();

  // const submitOrder = (): void => {
  //   toggleLoading(true);

  //   fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/orders/customCreate?populate=*`, {
  //     body: JSON.stringify({
  //       additionals: cartAdditionals.map(({ id, quantity, priceCZK, title, totalPrice }) => ({
  //         count: quantity,
  //         additional: {
  //           id,
  //           title,
  //         },
  //         productPriceCZK: priceCZK,
  //         totalAmountCZK: totalPrice,
  //       })),
  //       client: {
  //         email,
  //         name,
  //         phoneCountryCode: `${getCountryCallingCode(phoneCountryCode)}`,
  //         phoneNumber: phone,
  //       },
  //       cutleryCount,
  //       deliveryTime: time.value,
  //       deliveryAddress,
  //       deliveryAddressDistrict,
  //       deliveryCoordinates: `${clientPosition.lat},${clientPosition.lng}`,
  //       deliveryDistance,
  //       deliveryType,
  //       district: deliveryType === "delivery" ? district.delivery : district.pickup,
  //       items: products.map(({ id, modifiers, quantity }) => ({
  //         count: quantity,
  //         modifiers: modifiers.map(({ id: modifierID, submodifier }) => ({
  //           modifier: {
  //             id: modifierID,
  //           },
  //           subModifier: submodifier
  //             ? {
  //                 id: submodifier.id,
  //               }
  //             : null,
  //         })),
  //         product: {
  //           id,
  //         },
  //       })),
  //       note: `${note}${change ? `\n(Mám v hotovosti ${change} t<string>("currency"))` : ""}`,
  //       paymentType,
  //       promocode: promoCode,
  //     }),
  //     cache: "no-store",
  //     headers: {
  //       authorization: `Bearer ${process.env.API_TOKEN}`,
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //   })
  //     .then(
  //       (
  //         response,
  //       ): Promise<{
  //         checkoutUrl: string;
  //         errors: { message: string; path: string[] }[];
  //         order: { id: number };
  //         success: boolean;
  //       }> => response.json(),
  //     )
  //     .then((data): void => {
  //       if (data.errors && !!data.errors.length) {
  //         if (data.errors[0].path.includes("promocode")) {
  //           toast("Nesprávný promo code", { type: "error" });

  //           scroller.scrollTo("promo", {
  //             duration: 1000,
  //             ignoreCancelEvents: true,
  //             smooth: "easeInOutQuint",
  //           });
  //           toggleLoading(false);
  //           toggleDisabled(false);

  //           return;
  //         }
  //       }

  //       if (
  //         data.success &&
  //         (paymentInfo.type === "cash" || paymentInfo.type === "cardAfterDelivery")
  //       ) {
  //         router.push(`/orderConfirmed?refId=${data.order.id}`);

  //         return;
  //       }

  //       window.open(data.checkoutUrl, "_self");
  //     })
  //     .catch((error): void => {
  //       console.error(error);
  //     });
  // };

  // const handleCartSubmit = (): void => {
  //   toggleDisabled(true);

  //   if (validateOrder()) {
  //     submitOrder();

  //     return;
  //   }
  // };

  return (
    <Form
      action={validateAndSubmitCart}
      className={wrapperClass}
    >
      <p className={priceClass}>
        {t<string>("priceTotal")}: {totalPrice} {t<string>("currency")}
      </p>

      <Button type="submit">{t<string>("goToPay")}</Button>
    </Form>
  );
};

export { Submit };
