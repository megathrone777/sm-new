import React from "react";

import { createModifier } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, SubModifiersSelect } from "@/app/(auth)/(admin)/_components";
import { submodifiersHelpers } from "@/helpers/submodifiers";
import { useTranslation } from "@/hooks";
import { Checkbox, Input } from "@/ui";

import { wrapperClass } from "./CreateModifier.css";

const CreateModifier: React.FC = async () => {
  const submodifiers = await submodifiersHelpers.getSubmodifiers();
  const { t } = useTranslation();

  return (
    <FormLayout
      className={wrapperClass}
      formAction={createModifier}
    >
      <Input
        label="New modifier title"
        name="title"
        placeholder="New modifier title"
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

      <Checkbox
        label="Required submodifier"
        name="requiredSubModifier"
        type="checkbox"
      />

      {submodifiers && !!submodifiers.length && (
        <SubModifiersSelect
          defaultValue={[]}
          options={submodifiers.map<TSelectOption>(({ id, title }: TSubmodifier) => ({
            label: title,
            value: `${id}`,
          }))}
        />
      )}
    </FormLayout>
  );
};

export { CreateModifier };
