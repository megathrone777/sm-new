import React from "react";

import { useTranslation } from "@/hooks";

import { DetailsForm } from "./DetailsForm";
import { Modifiers } from "./Modifiers";

import {
  columnClass,
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
  wrapperClass,
} from "./Details.css";

import type { TProps } from "./Details.types";

const Details: React.FC<TProps> = (product) => {
  const {
    allergens,
    composition,
    description,
    imageUrl,
    isAvailable,
    modifiers,
    modifiersTitle,
    price,
    requiredModifier,
    title,
    weight,
  } = product;
  const { t } = useTranslation();
  const titleModifiers: string = modifiersTitle || t("modifiers");

  return (
    <div className={wrapperClass}>
      <div className={layoutClass}>
        <div className={columnClass}>
          <div className={imageHolderClass}>
            <img
              alt={title}
              className={imageClass}
              src={`https://sushiman-office.cz${imageUrl}`}
            />
          </div>
        </div>

        <div className={columnClass}>
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

            <div className={modifiersHeadingClass}>
              <p className={modifiersTitleClass}>{titleModifiers}:</p>
            </div>

            {isAvailable ? (
              <DetailsForm
                {...product}
                modifiersTitle={titleModifiers}
              >
                <Modifiers {...{ modifiers, requiredModifier }} />
              </DetailsForm>
            ) : (
              <p className={placeholderClass}>Momentálně nedostupný</p>
            )}
          </div>
        </div>

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
  );
};

export { Details };
