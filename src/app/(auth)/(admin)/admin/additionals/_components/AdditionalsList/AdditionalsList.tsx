import React from "react";
import Link from "next/link";

import { deleteAdditional, updateAdditional } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, ListLayout } from "@/app/(auth)/(admin)/_components";
import { additionalsHelpers } from "@/helpers/additionals";
import { useTranslation } from "@/hooks";
import { Button, Input } from "@/ui";

import { itemClass, itemFormClass, linkClass, listClass } from "./AdditionalsList.css";

const AdditionalsList: React.FC = async () => {
  const additionals = await additionalsHelpers.getAdditionals();
  const { t } = useTranslation();

  return (
    <ListLayout
      deleteAction={deleteAdditional}
      href="/admin/additionals"
    >
      {additionals && !!additionals.length && (
        <div className={listClass}>
          {additionals.map(
            ({ id, price, sortOrder, title }: TAdditional): React.ReactElement => (
              <div
                className={itemClass}
                key={`additional-${id}`}
              >
                <FormLayout
                  className={itemClass}
                  formAction={updateAdditional}
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
                    defaultValue={price}
                    label={`Price (${t<string>("currency")})`}
                    name="price"
                    type="number"
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
                  href={`/admin/additionals?deleteId=${id}&deleteTitle=${encodeURIComponent(title)}`}
                  scroll={false}
                >
                  <Button
                    iconId="trash"
                    template="small"
                  />
                </Link>
              </div>
            ),
          )}
        </div>
      )}
    </ListLayout>
  );
};

export { AdditionalsList };
