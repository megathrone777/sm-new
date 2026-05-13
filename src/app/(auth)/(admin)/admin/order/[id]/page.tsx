import React from "react";
import Link from "next/link";

import { deleteOrder } from "@/app/(auth)/(admin)/_actions";
import { Header } from "@/app/(auth)/(admin)/_components";
import { DeleteAlert } from "@/app/(auth)/_components";
import { store } from "@/store";
import { Button, Input } from "@/ui";

import { deleteWrapperClass, formClass } from "./page.css";

const Page: React.FC<PageProps<"/admin/order/[id]">> = async ({ params, searchParams }) => {
  const { id } = await params;
  const { deleteId, deleteTitle } = await searchParams;
  const order = await store.orders.getById(+id);

  return (
    <>
      {deleteId && (
        <DeleteAlert
          action={deleteOrder}
          deleteId={`${deleteId}`}
          deleteTitle={deleteTitle ? `${deleteTitle}` : null}
          href="/admin/orders"
        />
      )}

      <Header title={order ? `Order: #${id}` : `Order #${id} not found`} />

      {order && (
        <>
          <div className={formClass}>
            <input
              name="id"
              type="hidden"
              value={order.id}
            />

            <Input
              defaultValue={order.status}
              label="Status"
              readOnly
              type="text"
            />

            <Input
              defaultValue={new Date(order.createdAt).toLocaleString()}
              label="Created at"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.clientName}
              label="Client name"
              readOnly
              type="text"
            />

            <Input
              defaultValue={`+${order.clientPhoneNumber}`}
              label="Client phone"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.clientEmail}
              label="Client email"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.clientOrdersCount}
              label="Client orders count"
              readOnly
              type="number"
            />

            <Input
              defaultValue={order.deliveryType}
              label="Delivery type"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.deliveryTitle}
              label="Delivery title"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.deliveryTime}
              label="Delivery time"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.deliveryAddress}
              label="Delivery address"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.deliveryAddressDistrict}
              label="Delivery district"
              readOnly
              type="text"
            />

            <Input
              defaultValue={`${order.deliveryDistance} km`}
              label="Delivery distance"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.deliveryCoordinates}
              label="Delivery coordinates"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.courier}
              label="Courier"
              readOnly
              type="text"
            />

            <Input
              defaultValue={`${order.deliveryPrice} CZK`}
              label="Delivery price"
              readOnly
              type="text"
            />

            {order.products && !!order.products.length && (
              <div>
                {order.products.map<React.ReactElement>(
                  ({ id: productId, quantity, title, totalPrice }: TOrderProduct) => (
                    <p key={`order-product-item-${id}-${productId}`}>
                      {title} - x{quantity} - {totalPrice}CZK
                    </p>
                  ),
                )}
              </div>
            )}

            {order.additionals && !!order.additionals.length && (
              <div>
                {order.additionals.map<React.ReactElement>(
                  ({ id: additionalId, quantity, title, totalPrice }: TOrderAdditional) => (
                    <p key={`order-additional-item-${id}-${additionalId}`}>
                      {title} - x{quantity} - {totalPrice}CZK
                    </p>
                  ),
                )}
              </div>
            )}

            <Input
              defaultValue={`x${order.cutleryCount}`}
              label="Cutlery count"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.cutleryCountToPay}
              label="Cutlery count to pay"
              readOnly
              type="number"
            />

            <Input
              defaultValue={`${order.cutleryPrice} CZK`}
              label="Cutlery price"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.paymentType}
              label="Payment type"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.onlinePaymentStatus ?? ""}
              label="Online payment status"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.comgateTransId}
              label="Comgate transaction ID"
              readOnly
              type="text"
            />

            <Input
              defaultValue={
                order.comgateProcessedAt ? new Date(order.comgateProcessedAt).toLocaleString() : ""
              }
              label="Comgate processed at"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.promocode}
              label="Promo code"
              readOnly
              type="text"
            />

            <Input
              defaultValue={`${order.promocodeDiscountPrice} CZK`}
              label="Promo discount price"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.tipsAmount}
              label="Tips amount"
              readOnly
              type="number"
            />

            <Input
              defaultValue={`${order.tipsPrice} CZK`}
              label="Tips price"
              readOnly
              type="text"
            />

            <Input
              defaultValue={`${order.totalProductsPrice} CZK`}
              label="Total products price"
              readOnly
              type="text"
            />

            <Input
              defaultValue={`${order.totalAdditionalsPrice} CZK`}
              label="Total additionals price"
              readOnly
              type="text"
            />

            <Input
              defaultValue={`${order.totalPrice} CZK`}
              label="Total price"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.note ?? ""}
              label="Note"
              readOnly
              type="text"
            />

            <Input
              defaultValue={order.timeout}
              label="Timeout"
              readOnly
              type="number"
            />
          </div>

          <div className={deleteWrapperClass}>
            <Link
              href={`/admin/order/${id}?deleteId=${id}&deleteTitle=${encodeURIComponent(`Order #${id}`)}`}
              scroll={false}
            >
              <Button
                iconId="trash"
                template="small"
              />
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
