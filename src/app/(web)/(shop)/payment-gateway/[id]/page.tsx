import React from "react";
import { notFound, redirect } from "next/navigation";

import { markOrderCancelled, markOrderPaid } from "@/app/(web)/_actions";
import { getTranslation } from "@/dictionaries";
import { store } from "@/store";
import { Button, Container } from "@/ui";

import {
  buttonsClass,
  hintClass,
  layoutClass,
  summaryClass,
  titleClass,
  wrapperClass,
} from "./page.css";

const Page: React.FC<PageProps<"/payment-gateway/[id]">> = async ({ params }) => {
  const { id } = await params;
  const order = await store.orders.getById(+id);

  if (!order) return notFound();
  if (order.onlinePaymentStatus === "PAID") redirect(`/order-confirmed/${id}`);
  if (order.onlinePaymentStatus === "CANCELLED") redirect("/order-declined");

  return (
    <div className={wrapperClass}>
      <Container>
        <div className={layoutClass}>
          <h2 className={titleClass}>Payment gateway</h2>

          <p className={summaryClass}>
            #{id} — {order.totalPrice} {getTranslation<string>("currency")}
          </p>

          <p className={hintClass}>
            This is a dummy gateway. Pick an outcome to simulate the bank response.
          </p>

          <div className={buttonsClass}>
            <form action={markOrderPaid}>
              <input
                name="id"
                type="hidden"
                value={id}
              />

              <Button type="submit">Pay (success)</Button>
            </form>

            <form action={markOrderCancelled}>
              <input
                name="id"
                type="hidden"
                value={id}
              />

              <Button type="submit">Cancel (error)</Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;
