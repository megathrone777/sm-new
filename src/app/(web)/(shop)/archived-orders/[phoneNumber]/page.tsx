import React from "react";

import { ordersHelpers } from "@/helpers/orders";
import { Container } from "@/ui";

const Page: React.FC<PageProps<"/archived-orders/[phoneNumber]">> = async ({ params }) => {
  const { phoneNumber } = await params;
  const orders = await ordersHelpers.getOrdersByPhone(phoneNumber, 0, 100);

  return (
    <Container>
      {orders && !!orders.length && (
        <ul>
          {orders.map<React.ReactElement>((order: TOrder) => (
            <li key={`cart-history-order-${order.id}`}>
              #{order.id} — {order.createdAt} — {order.totalPrice} Kč
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default Page;
