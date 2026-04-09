import React from "react";
import Link from "next/link";

import { activatePromocode, deletePromocode, updatePromocode } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, ListLayout } from "@/app/(auth)/(admin)/_components";
import { promocodesHelpers } from "@/helpers";
import { Button, Input } from "@/ui";

import {
  activeBadgeClass,
  activateFormClass,
  codeClass,
  editFormClass,
  inactiveBadgeClass,
  itemClass,
  linkClass,
  listClass,
  ordersClass,
  pendingBadgeClass,
  rowClass,
  statusClass,
} from "./PromocodesList.css";

const PromocodesList: React.FC = async () => {
  const promocodes = await promocodesHelpers.getPromocodes();

  return (
    <ListLayout
      deleteAction={deletePromocode}
      href="/admin/promocodes"
    >
      {!!promocodes.length && (
        <div className={listClass}>
          {promocodes.map((promo: TPromoCode) => {
            const isEffectivelyActive = promocodesHelpers.isPromocodeActive(promo);
            const isScheduled =
              promo.isActive && !!promo.activatedAt && new Date() < new Date(promo.activatedAt);

            const statusBadge = isEffectivelyActive ? (
              <span className={activeBadgeClass}>Active</span>
            ) : isScheduled ? (
              <span className={pendingBadgeClass}>
                Scheduled: {new Date(promo.activatedAt!).toLocaleString()}
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
                    formAction={updatePromocode}
                    layoutClassName={editFormClass}
                  >
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
                      value={String(promo.isActive)}
                    />

                    <input
                      name="type"
                      type="hidden"
                      value={promo.type}
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

                <FormLayout
                  formAction={activatePromocode}
                  layoutClassName={activateFormClass}
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
                        : undefined
                    }
                    label="Activate at"
                    name="activatedAt"
                    type="datetime-local"
                  />
                </FormLayout>

                <PromoOrders code={promo.code} />
              </div>
            );
          })}
        </div>
      )}
    </ListLayout>
  );
};

const PromoOrders: React.FC<{ code: string }> = async ({ code }) => {
  const orders = await promocodesHelpers.getOrdersByPromocode(code);

  if (!orders.length) return null;

  return (
    <div className={ordersClass}>
      Orders using {code} ({orders.length}):&nbsp;
      {orders.map(({ clientPhoneNumber, createdAt, id, totalPrice }: TOrder) => (
        <span key={`promo-order-${id}`}>
          #{id} ({clientPhoneNumber}, {totalPrice} Kč, {new Date(createdAt).toLocaleDateString()}
          )&nbsp;
        </span>
      ))}
    </div>
  );
};

export { PromocodesList };
