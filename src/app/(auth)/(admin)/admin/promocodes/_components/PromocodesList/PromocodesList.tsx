import React from "react";
import Link from "next/link";

import { activatePromocode, deletePromocode, updatePromocode } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, ListLayout } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";
import { Button, Checkbox, Input } from "@/ui";

import { PromocodeOrders } from "./PromocodeOrders";

import {
  activeBadgeClass,
  activateFormClass,
  activateFormLayoutClass,
  codeClass,
  editFormClass,
  editFormLayoutClass,
  inactiveBadgeClass,
  itemClass,
  linkClass,
  listClass,
  pendingBadgeClass,
  rowClass,
  statusClass,
} from "./PromocodesList.css";

const PromocodesList: React.FC = async () => {
  const promocodes = await store.promocodes.getAll();

  return (
    <ListLayout
      deleteAction={deletePromocode}
      href="/admin/promocodes"
    >
      {!!promocodes.length && (
        <div className={listClass}>
          {promocodes.map((promo: TPromoCode) => {
            const isActive =
              promo.isActive && (!promo.activatedAt || new Date() >= new Date(promo.activatedAt));
            const isScheduled =
              promo.isActive && !!promo.activatedAt && new Date() < new Date(promo.activatedAt);

            const statusBadge = isActive ? (
              <span className={activeBadgeClass}>Active</span>
            ) : isScheduled ? (
              <span className={pendingBadgeClass}>
                Scheduled: {new Date(promo.activatedAt).toLocaleString()}
              </span>
            ) : (
              <span className={inactiveBadgeClass}>Inactive</span>
            );

            return (
              <div
                className={itemClass}
                key={`promo-${promo.code}`}
              >
                <div className={rowClass}>
                  <FormLayout
                    className={editFormClass}
                    formAction={updatePromocode}
                  >
                    <div className={editFormLayoutClass}>
                      <input
                        name="code"
                        type="hidden"
                        value={promo.code}
                      />

                      <span className={codeClass}>{promo.code}</span>

                      <Input
                        defaultValue={promo.discount}
                        label="Discount %"
                        name="discount"
                        type="number"
                      />

                      <span className={statusClass}>{statusBadge}</span>

                      <input
                        name="isActive"
                        type="hidden"
                        value={`${promo.isActive}`}
                      />

                      <Checkbox
                        defaultChecked={promo.type === "oneTime"}
                        label="One-time"
                        name="oneTime"
                        type="checkbox"
                      />
                    </div>
                  </FormLayout>

                  <FormLayout
                    className={activateFormClass}
                    formAction={activatePromocode}
                    layoutClassName={activateFormLayoutClass}
                  >
                    <input
                      name="code"
                      type="hidden"
                      value={promo.code}
                    />

                    <Input
                      defaultValue={
                        promo.activatedAt
                          ? new Date(promo.activatedAt).toISOString().slice(0, 16)
                          : ""
                      }
                      label="Activate at"
                      name="activatedAt"
                      type="datetime-local"
                    />
                  </FormLayout>

                  <Link
                    className={linkClass}
                    href={`/admin/promocodes?deleteId=${promo.code}&deleteTitle=${encodeURIComponent(promo.code)}`}
                    scroll={false}
                  >
                    <Button
                      iconId="trash"
                      template="small"
                    />
                  </Link>
                </div>

                <PromocodeOrders code={promo.code} />
              </div>
            );
          })}
        </div>
      )}
    </ListLayout>
  );
};

export { PromocodesList };
