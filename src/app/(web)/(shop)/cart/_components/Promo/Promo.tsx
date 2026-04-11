// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// import { useCart, useStore, useTranslation } from "~/hooks";
// import { setPromoCode, setPromoDiscount } from "~/store";
// import { ThemeComponent } from "~/theme";
// import type { TPromoResponse } from "./types";
// import {
//   StyledWrapper,
//   StyledTitle,
//   StyledLayout,
//   StyledInputWrapper,
//   StyledButton,
//   StyledErrorButton,
//   StyledSuccess,
//   StyledSubmit,
//   StyledLoaderWrapper,
// } from "./styled";

// const Promo: React.FC = () => {
//   const { dispatch } = useStore();
//   const { t } = useTranslation();
//   const {
//     additionals: cartAdditionals,
//     deliveryInfo,
//     errors,
//     note,
//     paymentInfo,
//     cutleryCount,
//     products,
//     promoCode,
//     promoDiscount,
//   } = useCart();
//   const [isLoading, toggleLoading] = useState<boolean>(false);
//   const [promoError, setPromoError] = useState<boolean>(false);
//   const {
//     address,
//     clientPosition: { lat, lng },
//     distanceInM,
//     email,
//     name,
//     phone,
//     type: deliveryType,
//     vicinity,
//   } = deliveryInfo;

//   const checkPromo = (): void => {
//     toggleLoading(true);
//     fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/orders/customCalcPrice?populate=*`, {
//       body: JSON.stringify({
//         additionals: cartAdditionals.map(
//           ({ id, quantity, priceCZK, title, totalPrice }) => ({
//             count: quantity,
//             additional: {
//               id,
//               title,
//             },
//             productPriceCZK: priceCZK,
//             totalAmountCZK: totalPrice,
//           }),
//         ),
//         client: {
//           email,
//           name,
//           phoneCountryCode: "",
//           phoneNumber: phone,
//         },
//         cutleryCount,
//         deliveryAddress: address,
//         deliveryAddressDistrict: vicinity,
//         deliveryCoordinates: `${lat},${lng}`,
//         deliveryDistance: distanceInM,
//         deliveryType,
//         items: products.map(({ id, modifiers, quantity }) => ({
//           count: quantity,
//           modifiers: modifiers.map(({ id: modifierID, submodifier }) => ({
//             modifier: {
//               id: modifierID,
//             },
//             subModifier: submodifier
//               ? {
//                   id: submodifier.id,
//                 }
//               : null,
//           })),
//           product: {
//             id,
//           },
//         })),
//         note,
//         paymentType: paymentInfo.type,
//         promocode: promoCode,
//       }),
//       cache: "no-cache",
//       headers: {
//         authorization: `Bearer ${process.env.API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//     })
//       .then((response): Promise<TPromoResponse> => response.json())
//       .then((data): void => {
//         if (data && data.order && data.order.promocodeDiscountAmountCZK > 0) {
//           dispatch(setPromoDiscount(data.order.promocodeDiscountAmountCZK));
//           setPromoError(false);

//           return;
//         }

//         if (data && data.errors && !!data.errors.length) {
//           setPromoError(true);
//         }

//         if (promoCode && promoCode.length > 0) {
//           setPromoError(true);
//         }
//       })
//       .catch((): void => {
//         if (promoCode && promoCode.length > 0) {
//           setPromoError(true);
//         }
//       })
//       .finally((): void => {
//         toggleLoading(false);
//       });
//   };

//   const handlePromoCodeChange = ({
//     currentTarget,
//   }: React.SyntheticEvent<HTMLInputElement>): void => {
//     dispatch(setPromoCode(currentTarget.value));
//   };

//   const handlePromoCodeReset = (): void => {
//     setPromoError(false);
//     dispatch(setPromoCode(""));
//   };

//   const handlePromoCodeSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
//     event.preventDefault();
//     toggleLoading(true);
//     fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/orders/customCalcPrice?populate=*`, {
//       body: JSON.stringify({
//         additionals: cartAdditionals.map(
//           ({ id, quantity, priceCZK, title, totalPrice }) => ({
//             count: quantity,
//             additional: {
//               id,
//               title,
//             },
//             productPriceCZK: priceCZK,
//             totalAmountCZK: totalPrice,
//           }),
//         ),
//         client: {
//           email,
//           name,
//           phoneCountryCode: "",
//           phoneNumber: phone,
//         },
//         cutleryCount,
//         deliveryAddress: address,
//         deliveryAddressDistrict: vicinity,
//         deliveryCoordinates: `${lat},${lng}`,
//         deliveryDistance: distanceInM,
//         deliveryType,
//         items: products.map(({ id, modifiers, quantity }) => ({
//           count: quantity,
//           modifiers: modifiers.map(({ id: modifierID, submodifier }) => ({
//             modifier: {
//               id: modifierID,
//             },
//             subModifier: submodifier
//               ? {
//                   id: submodifier.id,
//                 }
//               : null,
//           })),
//           product: {
//             id,
//           },
//         })),
//         note,
//         paymentType: paymentInfo.type,
//         promocode: promoCode,
//       }),
//       cache: "no-cache",
//       headers: {
//         authorization: `Bearer ${process.env.API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//     })
//       .then((response): Promise<TPromoResponse> => response.json())
//       .then((data): void => {
//         if (data && data.order && data.order.promocodeDiscountAmountCZK > 0) {
//           dispatch(setPromoDiscount(data.order.promocodeDiscountAmountCZK));
//           setPromoError(false);

//           return;
//         }

//         if (data && data.errors && !!data.errors.length) {
//           setPromoError(true);
//           toast(data.errors[0].message, { type: "error" });
//         }

//         if (promoCode && promoCode.length > 0) {
//           setPromoError(true);
//         }
//       })
//       .catch((): void => {
//         if (promoCode && promoCode.length > 0) {
//           setPromoError(true);
//         }
//       })
//       .finally((): void => {
//         toggleLoading(false);
//       });
//   };

//   useEffect((): void => {
//     checkPromo();
//   }, []);

//   return (
//     <StyledWrapper
//       action="#"
//       className={phone.length > 8 && !errors.phone ? "" : "disabled"}
//       id="promo"
//       onSubmit={handlePromoCodeSubmit}
//     >
//       <StyledTitle>{t<string>("promoTitle")}</StyledTitle>

//       <StyledLayout>
//         <StyledInputWrapper>
//           <ThemeComponent.Input
//             autoComplete="off"
//             disabled={promoDiscount > 0}
//             hasError={false}
//             iconID="promoIcon"
//             onChange={handlePromoCodeChange}
//             placeholder="Promo code"
//             type="text"
//             value={promoCode}
//           />
//         </StyledInputWrapper>

//         {promoError && (
//           <StyledErrorButton onClick={handlePromoCodeReset} type="button">
//             <svg>
//               <ThemeComponent.Icon iconID="crossIcon" />
//             </svg>
//           </StyledErrorButton>
//         )}

//         <StyledSubmit>
//           {isLoading ? (
//             <StyledLoaderWrapper>
//               <ThemeComponent.Loader isSmall />
//             </StyledLoaderWrapper>
//           ) : (
//             <React.Fragment>
//               {promoDiscount === 0 ? (
//                 <StyledButton type="submit">Použit</StyledButton>
//               ) : (
//                 <StyledSuccess>
//                   <ThemeComponent.Icon iconID="checkIcon" />
//                 </StyledSuccess>
//               )}
//             </React.Fragment>
//           )}
//         </StyledSubmit>
//       </StyledLayout>
//     </StyledWrapper>
//   );
// };

// export { Promo };
