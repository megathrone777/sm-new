import React from "react";
import Link from "next/link";

import { deleteModifier } from "@/app/(auth)/(admin)/_actions";
import { ListLayout } from "@/app/(auth)/(admin)/_components";
import { modifiersHelpers } from "@/helpers";
import { Button } from "@/ui";

import { headerClass, itemClass, linkClass, listClass } from "./ModifiersList.css";

const ModifiersList: React.FC = async () => {
  const modifiers = await modifiersHelpers.getModifiers();

  return (
    <ListLayout
      deleteAction={deleteModifier}
      href="/admin/modifiers"
    >
      <div className={headerClass}>
        <p>ID</p>
        <p>Title</p>
        <p>Price (CZK)</p>
        <p>Actions</p>
      </div>

      {modifiers && !!modifiers.length && (
        <div className={listClass}>
          {modifiers.map<React.ReactElement>(({ id, price, title }: TModifier) => (
            <div
              className={itemClass}
              key={`admin-modifier-item-${id}`}
            >
              <Link
                className={linkClass}
                href={`/admin/modifier/${id}`}
              >
                <p>{id}</p>
                <p>{title}</p>
                <p>{price} (CZK)</p>
              </Link>

              <Link
                href={`/admin/modifiers?deleteId=${id}&deleteTitle=${encodeURIComponent(title)}`}
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

export { ModifiersList };
