import React from "react";

import { updateSettings, updateSettingsImage } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, Header, ImageUploader } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";
import { Checkbox, Input } from "@/ui";

import {
  flagsClass,
  imageRowClass,
  itemClass,
  listClass,
  settingsFormClass,
  textareaClass,
  titleClass,
  wideClass,
} from "./page.css";

const Page: React.FC<PageProps<"/admin/settings">> = async () => {
  const {
    address,
    allergenyUrl,
    businessName,
    companyDetails,
    cutleryPrice,
    email,
    isAvailable,
    isOpened,
    lastTimeForPickup,
    logoUrl,
    phone,
    title,
  } = await store.shop.getSettings();

  return (
    <>
      <Header title="Settings" />

      <div className={listClass}>
        <div className={itemClass}>
          <p className={titleClass}>Images</p>

          <div className={imageRowClass}>
            <FormLayout formAction={updateSettingsImage}>
              <input
                name="key"
                type="hidden"
                value="logo"
              />

              <ImageUploader initialUrl={logoUrl} />
            </FormLayout>

            <FormLayout formAction={updateSettingsImage}>
              <input
                name="key"
                type="hidden"
                value="allergeny"
              />

              <ImageUploader initialUrl={allergenyUrl} />
            </FormLayout>
          </div>
        </div>

        <div className={itemClass}>
          <p className={titleClass}>General</p>

          <FormLayout
            formAction={updateSettings}
            layoutClassName={settingsFormClass}
          >
            <Input
              defaultValue={title}
              label="Title"
              name="title"
              type="text"
            />

            <Input
              defaultValue={cutleryPrice}
              label="Cutlery price"
              min={0}
              name="cutleryPrice"
              type="number"
            />

            <Input
              defaultValue={lastTimeForPickup}
              label="Last time for pickup"
              name="lastTimeForPickup"
              type="time"
            />

            <Input
              defaultValue={phone}
              label="Phone"
              name="phone"
              type="text"
            />

            <Input
              defaultValue={email}
              label="Email"
              name="email"
              type="email"
            />

            <Input
              defaultValue={address}
              label="Address"
              name="address"
              type="text"
            />

            <Input
              className={wideClass}
              defaultValue={businessName}
              label="Business name"
              name="businessName"
              type="text"
            />

            <div className={wideClass}>
              <p className={titleClass}>Company details</p>

              <textarea
                className={textareaClass}
                defaultValue={companyDetails}
                name="companyDetails"
                rows={4}
              />
            </div>

            <div className={`${flagsClass} ${wideClass}`}>
              <Checkbox
                defaultChecked={isAvailable}
                label="Is available"
                name="isAvailable"
                type="checkbox"
              />

              <Checkbox
                defaultChecked={isOpened}
                label="Is opened"
                name="isOpened"
                type="checkbox"
              />
            </div>
          </FormLayout>
        </div>
      </div>
    </>
  );
};

export default Page;
