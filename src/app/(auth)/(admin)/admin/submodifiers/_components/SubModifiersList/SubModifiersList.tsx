import React from "react";
import Link from "next/link";

import { deleteSubmodifier, updateSubmodifier } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, ListLayout } from "@/app/(auth)/(admin)/_components";
import { submodifiersHelpers } from "@/helpers/submodifiers";
import { Button, Input } from "@/ui";

import { itemClass, itemFormClass, listClass, linkClass } from "./SubModifiersList.css";

const SubModifiersList: React.FC = async () => {
  const subModifiers = await submodifiersHelpers.getSubmodifiers();

  return (
    <ListLayout
      deleteAction={deleteSubmodifier}
      href="/admin/submodifiers"
    >
      {subModifiers && !!subModifiers.length && (
        <div className={listClass}>
          {subModifiers.map<React.ReactElement>(({ id, sortOrder, title }: TSubmodifier) => (
            <div
              className={itemClass}
              key={`additional-${id}`}
            >
              <FormLayout
                className={itemClass}
                formAction={updateSubmodifier}
                layoutClassName={itemFormClass}
              >
                <input
                  name="id"
                  type="hidden"
                  value={id}
                />

                <Input
                  defaultValue={title}
                  label="Title"
                  name="title"
                  type="text"
                />

                <Input
                  defaultValue={sortOrder}
                  label="Sort order"
                  name="sortOrder"
                  type="number"
                />
              </FormLayout>

              <Link
                className={linkClass}
                href={`/admin/submodifiers?deleteId=${id}&deleteTitle=${encodeURIComponent(title)}`}
                scroll={false}
              >
                <Button
                  iconId="trash"
                  template="small"
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </ListLayout>
  );
};

export { SubModifiersList };
