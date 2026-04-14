import React from "react";
import { notFound } from "next/navigation";

import { ordersHelpers } from "@/helpers/orders";
import { Container } from "@/ui";

const Page: React.FC<PageProps<"/orderConfirmed/[id]">> = async ({ params }) => {
  const { id } = await params;
  const order = await ordersHelpers.getOrderById(id);

  if (order) {
    const { clientEmail, clientName } = order;

    return (
      <Container>
        <p>Order confirmed #{id}</p>
        <p>Name: {clientName}</p>
        <p>Email: {clientEmail}</p>
      </Container>
    );
  }

  return notFound();
};

export default Page;
