import React from "react";

// import { cartActions } from "@/app/actions";
import { useTranslation } from "@/hooks";
import { Button } from "@/ui";

import { Modifiers } from "./Modifiers";

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
  modifiersHeadingClass,
  modifiersTitleClass,
  placeholderClass,
  titleClass,
  totalPriceClass,
  totalTitleClass,
  wrapperClass,
} from "./Details.css";

import type { TProps } from "./Details.types";

const Details: React.FC<TProps> = (product) => {
  const {
    allergens,
    composition,
    description,
    // id,
    imageUrl,
    isAvailable,
    isMultipleModifiers,
    // isPromotionActive,
    modifiers,
    modifiersTitle,
    price,
    // promotionDiscountAmount,
    // promotionForEveryXProducts,
    requiredModifier,
    title,
    weight,
  } = product;
  // const [totalPrice, setTotalPrice] = useState<number>(price);
  const { t } = useTranslation();
  const titleModifiers: string = modifiersTitle || t("modifiers");

  console.log(titleModifiers);

  // const handleModifiersUpdate = (modifiers: TCartModifier[]): void => {
  //   const modifiersTotalPrice: number = modifiers.reduce<number>(
  //     (accumulator, { price }: TCartModifier) => accumulator + price,
  //     0,
  //   );

  //   setSelectedModifiers(modifiers);
  //   setTotalPrice(modifiersTotalPrice + price);
  // };

  // const handleAddToCart = async (): Promise<void> => {
  //   const fbEventData: TFacebookEvent = {
  //     content_ids: [id],
  //     content_type: "product",
  //     currency: "CZK",
  //     quantity: 1,
  //     value: totalPrice,
  //   };

  //   if (!shopIsOpened) {
  //     toggleModalOpened(true);
  //     return;
  //   }

  //   if (requiredModifier && selectedModifiers.length === 0) {
  //     toast(titleModifiers, { type: "error" });
  //     alert(titleModifiers);

  //     return;
  //   }

  //   if (
  //     selectedModifiers.some(
  //       ({ requiredSubModifier, subModifier }: TCartModifier): boolean =>
  //         requiredSubModifier && !subModifier,
  //     )
  //   ) {
  //     toast(titleModifiers, { type: "error" });
  //     alert(titleModifiers);

  //     return;
  //   }

  //   if (window.fbq) {
  //     window.fbq("track", "AddToCart", fbEventData);
  //   }

  //   await cartActions.addProduct({
  //     ...product,
  //     isPromotionActive,
  //     modifiers: selectedModifiers,
  //     promotionDiscountAmount,
  //     promotionForEveryXProducts,
  //     quantity: 1,
  //     totalPrice,
  //   });

  //   toast(`${title} přidán do košíku`, {
  //     type: "success",
  //   });
  //   setSelectedModifiers([]);
  // };

  // const handleModalToggle = (): void => {
  //   toggleModalOpened(!modalIsOpened);
  // };

  // useEffect((): void => {
  //   const fbEventData: TFacebookEvent = {
  //     content_ids: [id],
  //     content_type: "product",
  //   };

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
                <div className={modifiersHeadingClass}>
                  <p className={modifiersTitleClass}>{title}:</p>
                </div>

                {(isMultipleModifiers || isMultipleModifiers !== null) && (
                  <Modifiers {...{ modifiers }} />
                )}

                {isMultipleModifiers === null && !requiredModifier && (
                  <Modifiers {...{ modifiers }} />
                )}

                {/* {!isMultipleModifiers && requiredModifier && (
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
              {/* {totalPrice} Kč */}
            </p>
          </div>

          {isAvailable ? (
            <div className={buttonsLayoutClass}>
              <Button
                // onClick={handleAddToCart}
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
