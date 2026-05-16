import React from "react";
import Link from "next/link";

import { deleteDeliveryCondition, updateDeliveryCondition } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, ListLayout } from "@/app/(auth)/(admin)/_components";
import { useTranslation } from "@/hooks";
import { store } from "@/store";
import { Button, Input } from "@/ui";

import {
  editFormClass,
  itemClass,
  linkClass,
  listClass,
  rowClass,
} from "./DeliveryConditionsList.css";

const DeliveryConditionsList: React.FC = async () => {
  const { t } = useTranslation();
  const conditions = await store.deliveryConditions.getAll();

  return (
    <ListLayout
      deleteAction={deleteDeliveryCondition}
      href="/admin/deliveryConditions"
    >
      {conditions.length > 0 && (
        <div className={listClass}>
          {conditions.map<React.ReactElement>(
            ({
              distanceFrom,
              distanceTo,
              id,
              minimumOrderPrice,
              price,
              text,
              title,
            }: TDeliveryCondition) => (
              <div
                className={itemClass}
                key={`delivery-condition-${id}`}
              >
                <div className={rowClass}>
                  <FormLayout
                    formAction={updateDeliveryCondition}
                    layoutClassName={editFormClass}
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
                      defaultValue={distanceFrom}
                      label="From (m)"
                      name="distanceFrom"
                      type="number"
                    />

                    <Input
                      defaultValue={distanceTo}
                      label="To (m)"
                      name="distanceTo"
                      type="number"
                    />

                    <Input
                      defaultValue={price}
                      label={`Price (${t<string>("currency")})`}
                      name="price"
                      type="number"
                    />

                    <Input
                      defaultValue={minimumOrderPrice}
                      label={`Min order (${t<string>("currency")})`}
                      name="minimumOrderPrice"
                      type="number"
                    />

                    <Input
                      defaultValue={text}
                      label="Tier message"
                      name="text"
                      type="text"
                    />
                  </FormLayout>

                  <Link
                    className={linkClass}
                    href={`/admin/deliveryConditions?deleteId=${id}&deleteTitle=${encodeURIComponent(title)}`}
                    scroll={false}
                  >
                    <Button
                      iconId="trash"
                      template="small"
                    />
                  </Link>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </ListLayout>
  );
};

export { DeliveryConditionsList };
