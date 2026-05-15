import React from "react";

import { createReview } from "@/app/(auth)/(admin)/_actions";
import { FormLayout } from "@/app/(auth)/(admin)/_components";
import { Input } from "@/ui";

import { wrapperClass } from "./CreateReview.css";

const CreateReview: React.FC = () => (
  <FormLayout
    className={wrapperClass}
    formAction={createReview}
  >
    <Input
      label="Count"
      name="count"
      placeholder="1500+"
      type="text"
    />

    <Input
      label="Text"
      name="text"
      placeholder="pozitivních recenze"
      type="text"
    />

    <Input
      label="Link"
      name="link"
      placeholder="https://www.instagram.com/..."
      type="text"
    />

    <Input
      label="Link title"
      name="linkTitle"
      placeholder="Více"
      type="text"
    />
  </FormLayout>
);

export { CreateReview };