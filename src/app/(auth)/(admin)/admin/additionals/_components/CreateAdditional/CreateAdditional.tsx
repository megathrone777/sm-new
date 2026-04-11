import React from "react";

import { createAdditional } from "@/app/(auth)/(admin)/_actions";
import { FormLayout } from "@/app/(auth)/(admin)/_components";
import { useTranslation } from "@/hooks";
import { Input } from "@/ui";

import { wrapperClass } from "./CreateAdditional.css";

const CreateAdditional: React.FC = () => {
  const { t } = useTranslation();

  return (
    <FormLayout
      className={wrapperClass}
      formAction={createAdditional}
    >
      <Input
        label="Title"
        name="title"
        placeholder="New additional title"
        type="text"
      />

      <Input
        defaultValue="0"
        label={`Price (${t<string>("currency")})`}
        name="price"
        type="number"
      />

      <Input
        defaultValue="0"
        label="Sort order"
        name="sortOrder"
        type="number"
      />
    </FormLayout>
  );
};

export { CreateAdditional };
