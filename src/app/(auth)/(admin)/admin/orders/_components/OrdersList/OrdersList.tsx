import React from "react";
import Link from "next/link";

import { deleteOrder } from "@/app/(auth)/(admin)/_actions";
import { ListLayout } from "@/app/(auth)/(admin)/_components";
import { ordersHelpers } from "@/helpers/orders";
import { Button } from "@/ui";

import { headerClass, itemClass, linkClass, listClass } from "./OrdersList.css";

const OrdersList: React.FC = async () => {
  const orders = await ordersHelpers.getOrders();

  return (
    <ListLayout
      deleteAction={deleteOrder}
      href="/admin/orders"
    >
      <div className={headerClass}>
        <p>ID</p>
        <p>Client</p>
        <p>Payment type</p>
        <p>Delivery type</p>
        <p>Status</p>
        <p>Total price</p>
        <p>Actions</p>
      </div>

      {orders && !!orders.length && (
        <div className={listClass}>
          {orders.map<React.ReactElement>(
            ({ clientName, deliveryType, id, paymentType, status, totalPrice }: TOrder) => (
              <div
                className={itemClass}
                key={`admin-order-list-item-${id}`}
              >
                <Link
                  className={linkClass}
                  href={`/admin/order/${id}`}
                >
                  <p>{id}</p>
                  <p>{clientName}</p>
                  <p>{paymentType}</p>
                  <p>{deliveryType}</p>
                  <p>{status}</p>
                  <p>{totalPrice} (CZK)</p>
                </Link>

                <Link
                  href={`/admin/orders?deleteId=${id}&deleteTitle=${encodeURIComponent(id)}`}
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

export { OrdersList };
