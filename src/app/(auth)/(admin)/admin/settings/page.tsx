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
    closedByOverloadText,
    closedByOverloadTitle,
    closedByScheduleText,
    closedByScheduleTitle,
    companyDetails,
    cutleryPrice,
    email,
    isAvailable,
    lastTimeForPickup,
    logoUrl,
    mapUrl,
    phone,
    scheduleImageUrl,
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

              <p>Logo</p>

              <ImageUploader initialUrl={logoUrl} />
            </FormLayout>

            <FormLayout formAction={updateSettingsImage}>
              <input
                name="key"
                type="hidden"
                value="allergeny"
              />

              <p>Allergeny</p>

              <ImageUploader initialUrl={allergenyUrl} />
            </FormLayout>

            <FormLayout formAction={updateSettingsImage}>
              <input
                name="key"
                type="hidden"
                value="scheduleImage"
              />

              <p>Schedule background</p>

              <ImageUploader initialUrl={scheduleImageUrl} />
            </FormLayout>
          </div>
        </div>

        <div className={itemClass}>
          <p className={titleClass}>General</p>

          <FormLayout
            formAction={updateSettings}
            layoutClassName={settingsFormClass}
            resetOnSuccess={false}
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

            <div className={wideClass}>
              <p className={titleClass}>Google Maps embed URL (Contacts page)</p>

              <textarea
                className={textareaClass}
                defaultValue={mapUrl}
                name="mapUrl"
                rows={2}
              />
            </div>

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

            <Input
              defaultValue={closedByScheduleTitle}
              label="Closed by schedule — title"
              name="closedByScheduleTitle"
              type="text"
            />

            <Input
              defaultValue={closedByOverloadTitle}
              label="Closed by overload — title"
              name="closedByOverloadTitle"
              type="text"
            />

            <div className={wideClass}>
              <p className={titleClass}>Closed by schedule — text</p>

              <textarea
                className={textareaClass}
                defaultValue={closedByScheduleText}
                name="closedByScheduleText"
                rows={3}
              />
            </div>

            <div className={wideClass}>
              <p className={titleClass}>Closed by overload — text</p>

              <textarea
                className={textareaClass}
                defaultValue={closedByOverloadText}
                name="closedByOverloadText"
                rows={3}
              />
            </div>

            <div className={`${flagsClass} ${wideClass}`}>
              <Checkbox
                defaultChecked={isAvailable}
                label="Is available"
                name="isAvailable"
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
