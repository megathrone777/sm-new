"use client";
import React, { useState } from "react";

import { cartActions } from "@/app/actions";
import { useTranslation } from "@/hooks";
import { Button, Icon } from "@/theme/components";

import {
  buttonsLayoutClass,
  columnLeftClass,
  columnRightClass,
  contentClass,
  imageClass,
  imageHolderClass,
  itemClass,
  itemPriceClass,
  itemTitleClass,
  layoutClass,
  placeholderClass,
  titleClass,
  wrapperClass,
  totalPriceClass,
  totalTitleClass,
} from "./Details.css";

import type { TProps } from "./Details.types";

const Details: React.FC<TProps> = (product) => {
  const {
    allergens,
    composition,
    description,
    imageUrl,
    isAvailable,
    // isMultipleModifiers,
    modifiers,
    modifiersTitle,
    price,
    // promotionDiscountAmount,
    // promotionForEveryXProducts,
    // requiredModifier,
    // shortDescription,
    title,
    weight,
  } = product;
  const { t } = useTranslation();
  const [totalPrice] = useState<number>(price);
  const titleModifiers: string = modifiersTitle || t("modifiers");

  console.log(titleModifiers);

  // const handleModifiersUpdate = (modifiers: TSelectedModifier[]): void => {
  //   const modifiersTotalPrice: number = modifiers.reduce(
  //     (accumulator: number, { price }: TSelectedModifier): number => accumulator + price,
  //     0,
  //   );

  //   setSelectedModifiers(modifiers);
  //   setFinalPrice(modifiersTotalPrice + priceCZK);
  // };

  const handleAddToCart = async (): Promise<void> => {
    await cartActions.addProduct({
      ...product,
      isPromotionActive: false,
      quantity: 1,
      totalPrice,
    });
    // const fbEventData: TFacebookEvent = {
    //   content_ids: [id],
    //   content_type: "product",
    //   currency: "CZK",
    //   quantity: 1,
    //   value: finalPrice,
    // };
    // if (!shopIsOpened) {
    //   toggleModalOpened(true);
    //   return;
    // }
    // if (requiredModifier && selectedModifiers.length === 0) {
    //   toast(titleModifiers, { type: "error" });
    //   return;
    // }
    // if (
    //   selectedModifiers.some(
    //     ({ requiredSubModifier, submodifier }: TSelectedModifier): boolean =>
    //       requiredSubModifier && !submodifier,
    //   )
    // ) {
    //   toast(titleModifiers, { type: "error" });
    //   return;
    // }
    // if (window.fbq) {
    //   window.fbq("track", "AddToCart", fbEventData);
    // }
    // dispatch(
    //   addToCart({
    //     freeCutleryCount,
    //     id,
    //     isPromotionActive,
    //     modifiers: selectedModifiers,
    //     picture,
    //     price: +priceCZK,
    //     promotionDiscountAmount,
    //     promotionForEveryXProducts,
    //     quantity: 1,
    //     slug,
    //     title,
    //     totalPrice: finalPrice,
    //     weight,
    //   }),
    // );
    // toast(`${title} přidán do košíku`, {
    //   type: "success",
    // });
    // setSelectedModifiers([]);
  };

  // const handleModalToggle = (): void => {
  //   toggleModalOpened(!modalIsOpened);
  // };

  // useEffect((): void => {
  //   const fbEventData: TFacebookEvent = {
  //     content_type: "product",
  //     content_ids: [id],
  //   };

  //   console.log("ƒb view content:", fbEventData);

  //   if (window.fbq) {
  //     window.fbq("track", "ViewContent", fbEventData);
  //   }
  // }, []);

  return (
    <div className={wrapperClass}>
      <div className={layoutClass}>
        <div className={columnLeftClass}>
          <div className={imageHolderClass}>
            <img
              alt={title}
              className={imageClass}
              src={imageUrl}
            />
          </div>
        </div>

        <div className={columnRightClass}>
          <h2 className={titleClass}>{title}</h2>

          <div className={contentClass}>
            {composition && (
              <p className={itemClass}>
                <span className={itemTitleClass}>Složení:</span>
                {composition}
              </p>
            )}

            {description && !!description.length && (
              <p className={itemClass}>
                <span className={itemTitleClass}>Doplňky:</span>
                {description}
              </p>
            )}

            {allergens && (
              <p className={itemClass}>
                <span className={itemTitleClass}>Allergeny:</span>
                {allergens}
              </p>
            )}

            {weight && (
              <p className={itemClass}>
                <span className={itemTitleClass}>{t<string>("quantity")}:</span>
                {weight}
              </p>
            )}

            <p className={itemPriceClass}>
              <span className={itemTitleClass}>{t<string>("price")}:</span>
              {price} Kč
            </p>

            {modifiers && !!modifiers.length && (
              <>
                {/* {(isMultipleModifiers || isMultipleModifiers !== null) && (
                  <Modifiers
                    modifiers={modifiers.data}
                    onUpdate={handleModifiersUpdate}
                    title={titleModifiers}
                  />
                )}

                {isMultipleModifiers === null && !requiredModifier && (
                  <Modifiers
                    modifiers={modifiers.data}
                    onUpdate={handleModifiersUpdate}
                    title={titleModifiers}
                  />
                )}

                {!isMultipleModifiers && requiredModifier && (
                  <ModifiersSingle
                    modifiers={modifiers.data}
                    onUpdate={handleModifiersUpdate}
                    title={titleModifiers}
                  />
                )} */}
              </>
            )}

            <p className={totalPriceClass}>
              <span className={totalTitleClass}>{t<string>("priceTotal")}:</span>
              {totalPrice} Kč
            </p>

            <div style={{ color: "red", height: 30 }}>
              <Icon id="checkmark" />
            </div>
          </div>

          {isAvailable ? (
            <div className={buttonsLayoutClass}>
              <Button
                onClick={handleAddToCart}
                type="button"
              >
                {t<string>("addToCart")}
              </Button>
            </div>
          ) : (
            <p className={placeholderClass}>Momentálně nedostupný</p>
          )}

          {/* {modalIsOpened && (
            <Modal
              onClose={handleModalToggle}
              shopIsOpened={shopIsOpened}
              text={modalText}
              title={modalTitle}
              {...{ contactItems }}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export { Details };
