import React from "react";

import { store } from "@/store";

import {
  imageClass,
  itemClass,
  itemDescriptionClass,
  itemImageClass,
  itemImageHolderClass,
  layoutClass,
  wrapperClass,
} from "./Promotion.css";

const Promotion: React.FC = async () => {
  const [{ promotionBgUrl, promotionCol1Url, promotionCol2Url }, { col1Text, col2Text }] =
    await Promise.all([store.shop.getSettings(), store.promotion.get()]);

  if (!col1Text && !col2Text && !promotionBgUrl) return null;

  const columns = [
    { imageUrl: promotionCol1Url, text: col1Text },
    { imageUrl: promotionCol2Url, text: col2Text },
  ];

  return (
    <section
      className={wrapperClass}
      id="promotion-section"
    >
      {promotionBgUrl && (
        <img
          alt="Promotion background."
          className={imageClass}
          src={promotionBgUrl}
        />
      )}

      <div className={layoutClass}>
        {columns.map<React.ReactElement>(({ imageUrl, text }) => (
          <div
            className={itemClass}
            key={imageUrl || text.slice(0, 20)}
          >
            {imageUrl && (
              <div className={itemImageHolderClass}>
                <img
                  alt="Promo banner."
                  className={itemImageClass}
                  src={imageUrl}
                />
              </div>
            )}

            {text && (
              <div
                className={itemDescriptionClass}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export { Promotion };
