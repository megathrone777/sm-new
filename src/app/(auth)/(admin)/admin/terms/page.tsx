import React from "react";

import { updateTerms } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, Header } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";

import { textareaClass } from "./page.css";

const Page: React.FC = async () => {
  const { content } = await store.terms.get();

  return (
    <>
      <Header title="Terms" />

      <FormLayout
        formAction={updateTerms}
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
