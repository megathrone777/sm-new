import React from "react";

import { Header } from "@/app/(auth)/(admin)/_components";
import { ordersHelpers } from "@/helpers";
import { Input } from "@/ui";

import { formClass } from "./page.css";

const Page: React.FC<PageProps<"/admin/order/[id]">> = async ({ params }) => {
  const { id } = await params;
  const order = await ordersHelpers.getOrderById(id);

  console.log(order);

  if (!order) {
    return <Header title={`Order #${id} not found`} />;
  }

  return (
    <>
      <Header title={`Order: #${id}`} />

      <div className={formClass}>
        <input
          name="id"
          type="hidden"
          value={order.id}
        />

        <Input
          defaultValue={order.deliveryType}
          disabled
          label="Delivery type"
          type="text"
        />

        <Input
          defaultValue={`${order.deliveryPrice} CZK`}
          disabled
          label="Delivery price"
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

        <Input
          defaultValue={`${order.totalProductsPrice} CZK`}
          disabled
          label="Total products price"
          type="text"
        />

        <Input
          defaultValue={`${order.totalAdditionalsPrice} CZK`}
          disabled
          label="Total additionals price"
          type="text"
        />

        <Input
          defaultValue={`${order.promocodeDiscountPrice} CZK`}
          disabled
          label="Promo discount price"
          type="text"
        />

        <Input
          defaultValue={`x${order.cutleryCount}`}
          disabled
          label="Cutlery count"
          type="text"
        />

        <Input
          defaultValue={order.cutleryCountToPay}
          disabled
          label="Cutlery count to pay"
          type="number"
        />

        <Input
          defaultValue={order.note ?? ""}
          disabled
          label="Note"
          type="text"
        />

        <Input
          defaultValue={`${order.totalPrice} CZK`}
          disabled
          label="Total price"
          type="text"
        />
      </div>
    </>
  );
};

export default Page;
