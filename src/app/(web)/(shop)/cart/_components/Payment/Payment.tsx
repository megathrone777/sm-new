// import React, { useEffect } from "react";
// import Link from "next/link";

// import { useCart, useStore, useTranslation } from "~/hooks";
// import { setPaymentInfo } from "~/store";
// import { ThemeComponent } from "~/theme";
// import {
//   StyledWrapper,
//   StyledLayout,
//   StyledRow,
//   StyledTitle,
//   StyledLabelImageHolder,
//   StyledLabelImage,
//   StyledAgree,
//   StyledAgreeLabel,
//   StyledAgreeLink,
//   StyledTotal,
//   StyledChangeWrapper,
// } from "./styled";

// const Payment: React.FC = () => {
//   const { dispatch } = useStore();
//   const { deliveryInfo, paymentInfo, totalPrice } = useCart();
//   const { t } = useTranslation();

//   const handlePaymentChange = ({
//     currentTarget,
//   }: React.SyntheticEvent<HTMLInputElement>): void => {
//     dispatch(
//       setPaymentInfo({
//         type: currentTarget.value as TPaymentInfo["type"],
//       }),
//     );
//   };

//   const handleChangeToggle = ({
//     currentTarget,
//   }: React.SyntheticEvent<HTMLInputElement>): void => {
//     const { checked, value } = currentTarget;

//     dispatch(
//       setPaymentInfo({
//         change: checked ? (+value as TPaymentInfo["change"]) : null,
//       }),
//     );
//   };

//   useEffect((): void => {
//     if (paymentInfo.type !== "cash") {
//       const fbEventData: TFacebookEvent = {
//         value: totalPrice,
//         currency: "CZK",
//       };

//       console.log("track adding payment info...");
//       console.log("ƒb event data:", fbEventData);
//       if (window.fbq) {
//         window.fbq("track", "AddPaymentInfo", fbEventData);
//       }

//       dispatch(
//         setPaymentInfo({
//           change: null,
//         }),
//       );
//     }
//   }, [paymentInfo.type]);

//   return (
//     <StyledWrapper>
//       <StyledTitle>{t<string>("paymentMethods")}</StyledTitle>

//       <StyledLayout>
//         <StyledRow>
//           <ThemeComponent.Checkbox
//             checked={paymentInfo.type === "card"}
//             id="input-card"
//             label={t<string>("payByCard")}
//             labelImage={
//               <StyledLabelImageHolder>
//                 <StyledLabelImage alt="Apple pay" src="/images/payments_img2.png" />
//                 <StyledLabelImage alt="Card" src="/images/payments_img.png" />
//               </StyledLabelImageHolder>
//             }
//             name="payment"
//             onChange={handlePaymentChange}
//             type="radio"
//             value="card"
//           />
//         </StyledRow>

//         {deliveryInfo.type === "pickup" && (
//           <StyledRow>
//             <ThemeComponent.Checkbox
//               checked={paymentInfo.type === "cardAfterDelivery"}
//               id="cardAfterDelivery"
//               label={t<string>("payByCardPickup")}
//               labelImage={
//                 <StyledLabelImageHolder>
//                   <StyledLabelImage alt="Apple pay" src="/images/payments_img2.png" />
//                   <StyledLabelImage alt="Card" src="/images/payments_img.png" />
//                 </StyledLabelImageHolder>
//               }
//               name="cardAfterDelivery"
//               onChange={handlePaymentChange}
//               type="radio"
//               value="cardAfterDelivery"
//             />
//           </StyledRow>
//         )}

//         <StyledRow>
//           <ThemeComponent.Checkbox
//             checked={paymentInfo.type === "cash"}
//             id="input-cash"
//             label={t<string>("payByCash")}
//             labelImage={
//               <StyledLabelImageHolder>
//                 <StyledLabelImage alt="Card" src="/images/cash_img.jpg" />
//               </StyledLabelImageHolder>
//             }
//             name="cash"
//             onChange={handlePaymentChange}
//             type="radio"
//             value="cash"
//           />
//         </StyledRow>

//         {paymentInfo.type === "cash" && (
//           <StyledChangeWrapper>
//             <StyledRow>
//               <ThemeComponent.Checkbox
//                 checked={paymentInfo.change === 2000}
//                 id="input-change-cash"
//                 label="Mám v hotovosti 2000 t<string>("currency")"
//                 name="cash-change"
//                 onChange={handleChangeToggle}
//                 type="checkbox"
//                 value={2000}
//               />
//             </StyledRow>

//             <StyledRow>
//               <ThemeComponent.Checkbox
//                 checked={paymentInfo.change === 5000}
//                 id="input-change-cash2"
//                 label="Mám v hotovosti 5000 t<string>("currency")"
//                 name="cash-change"
//                 onChange={handleChangeToggle}
//                 type="checkbox"
//                 value={5000}
//               />
//             </StyledRow>
//           </StyledChangeWrapper>
//         )}
//       </StyledLayout>

//       <StyledAgree>
//         <ThemeComponent.Checkbox
//           defaultChecked
//           disabled
//           id="input-terms"
//           label={
//             <StyledAgreeLabel>
//               Při pokračování v nákupu souhlasíte a potvrzujete, že jste se <br />
//               seznámil s{" "}
//               <StyledAgreeLink as={Link} href="/terms">
//                 obchodními podmínkami
//               </StyledAgreeLink>
//             </StyledAgreeLabel>
//           }
//           type="checkbox"
//         />
//       </StyledAgree>

//       <StyledTotal>
//         {t<string>("priceTotal")}: {totalPrice} {t<string>("currency")}
//       </StyledTotal>
//     </StyledWrapper>
//   );
// };

// export { Payment };
