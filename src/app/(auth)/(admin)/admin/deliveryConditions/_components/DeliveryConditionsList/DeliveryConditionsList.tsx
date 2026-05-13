import React from "react";
import Link from "next/link";

import { deleteDeliveryCondition, updateDeliveryCondition } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, ListLayout } from "@/app/(auth)/(admin)/_components";
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
  const conditions = await store.deliveryConditions.getAll();

  return (
    <ListLayout
      deleteAction={deleteDeliveryCondition}
      href="/admin/deliveryConditions"
    >
      {conditions.length > 0 && (
        <div className={listClass}>
          {conditions.map((condition: TDeliveryCondition) => (
            <div
              className={itemClass}
              key={`delivery-condition-${condition.id}`}
            >
              <div className={rowClass}>
                <FormLayout
                  formAction={updateDeliveryCondition}
                  layoutClassName={editFormClass}
                >
                  <input
                    name="id"
                    type="hidden"
                    value={condition.id}
                  />

                  <Input
                    defaultValue={condition.title}
                    label="Title"
                    name="title"
                    type="text"
                  />

                  <Input
                    defaultValue={condition.distanceFrom}
                    label="From (m)"
                    name="distanceFrom"
                    type="number"
                  />

                  <Input
                    defaultValue={condition.distanceTo}
                    label="To (m)"
                    name="distanceTo"
                    type="number"
                  />

                  <Input
                    defaultValue={condition.price}
                    label="Price (Kč)"
                    name="price"
                    type="number"
                  />

                  <Input
                    defaultValue={condition.minimumOrderPrice}
                    label="Min order (Kč)"
                    name="minimumOrderPrice"
                    type="number"
                  />

                  <Input
                    defaultValue={condition.text}
                    label="Tier message"
                    name="text"
                    type="text"
                  />
                </FormLayout>

                <Link
                  className={linkClass}
                  href={`/admin/deliveryConditions?deleteId=${condition.id}&deleteTitle=${encodeURIComponent(condition.title)}`}
                  scroll={false}
                >
                  <Button
                    iconId="trash"
                    template="small"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </ListLayout>
  );
};

export { DeliveryConditionsList };
