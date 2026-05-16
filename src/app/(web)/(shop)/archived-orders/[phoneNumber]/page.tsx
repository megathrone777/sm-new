import React from "react";

import { Products } from "@/app/(web)/_components";
import { store } from "@/store";
import { Container } from "@/ui";

import { OrdersClient } from "./_components/OrdersClient";

import { emptyClass, titleClass, wrapperClass } from "./page.css";

import type { TArchivedOrder } from "./_components/OrdersClient/OrdersClient.types";

const Page: React.FC<PageProps<"/archived-orders/[phoneNumber]">> = async ({ params }) => {
  const { phoneNumber } = await params;
  const [orders, allProducts] = await Promise.all([
    store.orders.getByPhone(phoneNumber, 0, 100),
    store.products.getAllRaw(),
  ]);
  const ordersWithMeta: TArchivedOrder[] = (orders ?? []).map(
    (order: TOrder): TArchivedOrder => ({
      ...order,
      canRepeat:
        order.products.length > 0 &&
        order.products.every((product) => allProducts?.[product.slug]?.isAvailable === true),
      hasInvoice:
        order.status === "placed" &&
        (order.paymentType === "cash" ||
          order.paymentType === "cardAfterDelivery" ||
          (order.paymentType === "card" && order.onlinePaymentStatus === "PAID")),
    }),
  );

  return (
    <>
      <div className={wrapperClass}>
        <Container>
          <h2 className={titleClass}>Archivní objednávky</h2>

          {ordersWithMeta.length > 0 ? (
            <OrdersClient orders={ordersWithMeta} />
          ) : (
            <p className={emptyClass}>Žádné objednávky nenalezeny.</p>
          )}
        </Container>
      </div>

      <Products title="Chcete ještě něco přidat?" />
    </>
  );
};

export { metadata } from "./metadata";
export default Page;
