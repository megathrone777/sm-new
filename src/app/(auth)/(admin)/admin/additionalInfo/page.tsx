import React from "react";

import {
  updateAdditionalInfo,
  updateSettingsImage,
} from "@/app/(auth)/(admin)/_actions";
import { FormLayout, Header, ImageUploader } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";
import { Input } from "@/ui";

import { columnsGridClass, pageClass, textareaClass } from "./page.css";

const Page: React.FC = async () => {
  const [
    { col1Text, col1Title, col2Text, col2Title, col3Text, col3Title, description, title },
    { additionalInfoBgUrl },
  ] = await Promise.all([store.additionalInfo.get(), store.shop.getSettings()]);

  return (
    <>
      <Header title="Additional Info" />

      <div className={pageClass}>
        <FormLayout formAction={updateSettingsImage}>
          <input
            name="key"
            type="hidden"
            value="additionalInfoBg"
          />

          <p>Background image</p>

          <ImageUploader initialUrl={additionalInfoBgUrl} />
        </FormLayout>

        <FormLayout
          formAction={updateAdditionalInfo}
          layoutClassName={pageClass}
          resetOnSuccess={false}
        >
          <Input
            defaultValue={title}
            label="Section title"
            name="title"
            type="text"
          />

          <div>
            <p>Description (schedule text)</p>

            <textarea
              className={textareaClass}
              defaultValue={description}
              name="description"
              rows={4}
            />
          </div>

          <div className={columnsGridClass}>
            <div>
              <Input
                defaultValue={col1Title}
                label="Column 1 title"
                name="col1Title"
                type="text"
              />

              <textarea
                className={textareaClass}
                defaultValue={col1Text}
                name="col1Text"
                rows={4}
              />
            </div>

            <div>
              <Input
                defaultValue={col2Title}
                label="Column 2 title"
                name="col2Title"
                type="text"
              />

              <textarea
                className={textareaClass}
                defaultValue={col2Text}
                name="col2Text"
                rows={4}
              />
            </div>

            <div>
              <Input
                defaultValue={col3Title}
                label="Column 3 title"
                name="col3Title"
                type="text"
              />

              <textarea
                className={textareaClass}
                defaultValue={col3Text}
                name="col3Text"
                rows={4}
              />
            </div>
          </div>
        </FormLayout>
      </div>
    </>
  );
};

export default Page;
