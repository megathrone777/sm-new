import React from "react";

import { updateModifier } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, Header, SubModifiersSelect } from "@/app/(auth)/(admin)/_components";
import { modifiersHelpers, submodifiersHelpers } from "@/helpers";
import { Checkbox, Input } from "@/ui";

import { formClass } from "./page.css";

const Page: React.FC<PageProps<"/admin/modifier/[id]">> = async ({ params }) => {
  const { id } = await params;
  const [modifier, submodifiers] = await Promise.all([
    modifiersHelpers.getModifierById(Number(id)),
    submodifiersHelpers.getSubmodifiers(),
  ]);

  if (!modifier) return <p>Modifier not found</p>;
  const assignedIds = (modifier.subModifiers ?? []).map<string>(
    ({ id: submodifierId }) => `${submodifierId}`,
  );

  return (
    <>
      <Header title={`Modifier | ${modifier.title}`} />

      <FormLayout
        formAction={updateModifier}
        layoutClassName={formClass}
      >
        <input
          name="id"
          type="hidden"
          value={modifier.id}
        />

        <Input
          defaultValue={modifier.title}
          label="Title"
          name="title"
          type="text"
        />

        <Input
          defaultValue={modifier.price}
          label="Price (Kč)"
          name="price"
          type="number"
        />

        <Input
          defaultValue={modifier.sortOrder}
          label="Sort order"
          name="sortOrder"
          type="number"
        />

        <Checkbox
          defaultChecked={modifier.requiredSubModifier}
          label="Required submodifier"
          name="requiredSubModifier"
          type="checkbox"
        />

        {submodifiers && !!submodifiers.length && (
          <SubModifiersSelect
            defaultValue={assignedIds}
            options={submodifiers.map<TSelectOption>(({ id, title }: TSubmodifier) => ({
              label: title,
              value: `${id}`,
            }))}
          />
        )}
      </FormLayout>
    </>
  );
};

export default Page;
