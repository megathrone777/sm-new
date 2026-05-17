import React from "react";

import { updateHero, updateSettingsImage } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, Header, ImageUploader } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";
import { Input } from "@/ui";

import { pageClass, textareaClass } from "./page.css";

const Page: React.FC<PageProps<"/admin/hero">> = async () => {
  const [
    { buttonLink, buttonTitle, description, title },
    { heroMainMobileUrl, heroMainTabletUrl, heroMainUrl, heroPagesUrl },
  ] = await Promise.all([store.hero.get(), store.shop.getSettings()]);

  return (
    <>
      <Header title="Hero" />

      <div className={pageClass}>
        <FormLayout formAction={updateSettingsImage}>
          <input
            name="key"
            type="hidden"
            value="heroMain"
          />

          <p>Main page hero — desktop ≥768px (required)</p>
          <ImageUploader
            initialUrl={heroMainUrl}
            required
          />
        </FormLayout>

        <FormLayout formAction={updateSettingsImage}>
          <input
            name="key"
            type="hidden"
            value="heroMainTablet"
          />

          <p>Main page hero — tablet 500–767px (required)</p>
          <ImageUploader
            initialUrl={heroMainTabletUrl}
            required
          />
        </FormLayout>

        <FormLayout formAction={updateSettingsImage}>
          <input
            name="key"
            type="hidden"
            value="heroMainMobile"
          />

          <p>Main page hero — mobile &lt;500px (required)</p>
          <ImageUploader
            initialUrl={heroMainMobileUrl}
            required
          />
        </FormLayout>

        <FormLayout formAction={updateSettingsImage}>
          <input
            name="key"
            type="hidden"
            value="heroPages"
          />

          <p>Other pages hero (smaller)</p>
          <ImageUploader initialUrl={heroPagesUrl} />
        </FormLayout>

        <FormLayout
          formAction={updateHero}
          layoutClassName={pageClass}
          resetOnSuccess={false}
        >
          <Input
            defaultValue={title}
            label="Title"
            name="title"
            type="text"
          />

          <div>
            <p>Description (HTML supported)</p>

            <textarea
              className={textareaClass}
              defaultValue={description}
              name="description"
              rows={5}
            />
          </div>

          <Input
            defaultValue={buttonTitle}
            label="Button title"
            name="buttonTitle"
            type="text"
          />

          <Input
            defaultValue={buttonLink}
            label="Button link"
            name="buttonLink"
            type="text"
          />
        </FormLayout>
      </div>
    </>
  );
};

export default Page;
