import React from "react";

import { updatePromotion, updateSettingsImage } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, Header, ImageUploader } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";

import { columnsGridClass, pageClass, textareaClass } from "./page.css";

const Page: React.FC = async () => {
  const [
    { col1Text, col2Text },
    { promotionBgUrl, promotionCol1Url, promotionCol2Url },
  ] = await Promise.all([store.promotion.get(), store.shop.getSettings()]);

  return (
    <>
      <Header title="Promotion" />

      <div className={pageClass}>
        <FormLayout formAction={updateSettingsImage}>
          <input
            name="key"
            type="hidden"
            value="promotionBg"
          />

          <p>Background image</p>

          <ImageUploader initialUrl={promotionBgUrl} />
        </FormLayout>

        <div className={columnsGridClass}>
          <div className={pageClass}>
            <FormLayout formAction={updateSettingsImage}>
              <input
                name="key"
                type="hidden"
                value="promotionCol1"
              />

              <p>Column 1 image</p>

              <ImageUploader initialUrl={promotionCol1Url} />
            </FormLayout>
          </div>

          <div className={pageClass}>
            <FormLayout formAction={updateSettingsImage}>
              <input
                name="key"
                type="hidden"
                value="promotionCol2"
              />

              <p>Column 2 image</p>

              <ImageUploader initialUrl={promotionCol2Url} />
            </FormLayout>
          </div>
        </div>

        <FormLayout
          formAction={updatePromotion}
          layoutClassName={pageClass}
          resetOnSuccess={false}
        >
          <div className={columnsGridClass}>
            <div>
              <p>Column 1 text (HTML)</p>

              <textarea
                className={textareaClass}
                defaultValue={col1Text}
                name="col1Text"
                rows={8}
              />
            </div>

            <div>
              <p>Column 2 text (HTML)</p>

              <textarea
                className={textareaClass}
                defaultValue={col2Text}
                name="col2Text"
                rows={8}
              />
            </div>
          </div>
        </FormLayout>
      </div>
    </>
  );
};

export default Page;
