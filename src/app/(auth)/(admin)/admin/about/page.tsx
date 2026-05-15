import React from "react";

import { updateAbout, updateAboutImage } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, Header, ImageUploader } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";
import { Input } from "@/ui";

import { aboutFormClass, textareaClass } from "./page.css";

const Page: React.FC = async () => {
  const { description, imageUrl, title } = await store.about.get();

  return (
    <>
      <Header title="About" />

      <div className={aboutFormClass}>
        <FormLayout formAction={updateAboutImage}>
          <ImageUploader initialUrl={imageUrl} />
        </FormLayout>

        <FormLayout
          formAction={updateAbout}
          layoutClassName={aboutFormClass}
          resetOnSuccess={false}
        >
          <Input
            defaultValue={title}
            label="Title"
            name="title"
            type="text"
          />

          <textarea
            className={textareaClass}
            defaultValue={description}
            name="description"
            rows={8}
          />
        </FormLayout>
      </div>
    </>
  );
};

export default Page;