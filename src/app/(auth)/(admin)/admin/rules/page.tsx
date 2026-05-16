import React from "react";

import { updateRules } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, Header } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";

import { textareaClass } from "./page.css";

const Page: React.FC = async () => {
  const { content } = await store.rules.get();

  return (
    <>
      <Header title="Rules" />

      <FormLayout
        formAction={updateRules}
        resetOnSuccess={false}
      >
        <textarea
          className={textareaClass}
          defaultValue={content}
          name="content"
          rows={30}
        />
      </FormLayout>
    </>
  );
};

export default Page;
