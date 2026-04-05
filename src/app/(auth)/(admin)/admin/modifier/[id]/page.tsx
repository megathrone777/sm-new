import React from "react";
import Form from "next/form";

import { updateModifier } from "@/app/(auth)/(admin)/_actions";
import { Header } from "@/app/(auth)/(admin)/_components";
import { modifiersHelpers, submodifiersHelpers } from "@/helpers";
import { Button, Container, Input } from "@/ui";

const Page: React.FC<PageProps<"/admin/modifier/[id]">> = async ({ params }) => {
  const { id } = await params;
  const [modifier, submodifiers] = await Promise.all([
    modifiersHelpers.getModifierById(Number(id)),
    submodifiersHelpers.getSubmodifiers(),
  ]);

  if (!modifier)
    return (
      <Container>
        <p>Modifier not found</p>
      </Container>
    );

  const assignedIds = (modifier.subModifiers ?? []).map(({ id: sid }) => sid);

  return (
    <Container>
      <Header title={modifier.title} />

      <Form action={updateModifier}>
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

        <label>
          <input
            defaultChecked={modifier.requiredSubModifier}
            name="requiredSubModifier"
            type="checkbox"
          />{" "}
          Required submodifier
        </label>

        {!!submodifiers.length && (
          <fieldset>
            <legend>Submodifiers</legend>
            {submodifiers.map(({ id: sid, title }: TSubmodifier) => (
              <label key={`modifier-sub-${sid}`}>
                <input
                  defaultChecked={assignedIds.includes(sid)}
                  name="subModifierIds"
                  type="checkbox"
                  value={sid}
                />{" "}
                {title}
              </label>
            ))}
          </fieldset>
        )}

        <Button
          template="small"
          type="submit"
        >
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default Page;
