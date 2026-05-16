import React from "react";
import Image from "next/image";

import { store } from "@/store";

import {
  imageClass,
  itemClass,
  itemDescriptionClass,
  itemImageClass,
  itemImageHolderClass,
  layoutClass,
  listClass,
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
        <Image
          alt="Promotion."
          className={imageClass}
          fill
          priority
          sizes="100vw"
          src={promotionBgUrl}
        />
      )}

      <div className={layoutClass}>
        {columns && !!columns.length && (
          <div className={listClass}>
            {columns.map<React.ReactElement>(({ imageUrl, text }) => (
              <div
                className={itemClass}
                key={imageUrl || text.slice(0, 20)}
              >
                {imageUrl && (
                  <div className={itemImageHolderClass}>
                    <Image
                      alt="Promo banner."
                      className={itemImageClass}
                      height={0}
                      loading="eager"
                      sizes="(min-width: 768px) 350px, 200px"
                      src={imageUrl}
                      width={0}
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
        )}
      </div>
    </section>
  );
};

export { Promotion };
