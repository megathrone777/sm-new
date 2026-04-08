import React from "react";

import { createSubmodifier } from "@/app/(auth)/(admin)/_actions";
import { FormLayout } from "@/app/(auth)/(admin)/_components";
import { Input } from "@/ui";

import { wrapperClass } from "./CreateSubModifier.css";

const CreateSubModifier: React.FC = () => (
  <FormLayout
    className={wrapperClass}
    formAction={createSubmodifier}
  >
    <Input
      label="New subModifier title"
      name="title"
      placeholder="New subModifier title"
      type="text"
    />

    <Input
      defaultValue={0}
      label="Sort order"
      name="sortOrder"
      type="number"
    />
  </FormLayout>
);

export { CreateSubModifier };
