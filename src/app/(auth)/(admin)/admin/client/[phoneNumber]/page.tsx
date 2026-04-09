import React from "react";
import Link from "next/link";

import { Header } from "@/app/(auth)/(admin)/_components";
import { clientsHelpers, ordersHelpers } from "@/helpers";
import { Input } from "@/ui";

import { idClass, labelClass, linkClass, wrapperClass } from "./page.css";

const Page: React.FC<PageProps<"/admin/client/[phoneNumber]">> = async ({ params }) => {
  const { phoneNumber } = await params;
  const orders = await ordersHelpers.getOrdersByPhone(phoneNumber);
  const client = await clientsHelpers.getClientByPhone(phoneNumber);

  if (!client) {
    return <Header title="Client not found." />;
  }

  return (
    <>
      <Header title={`Client: ${client.name}`} />

      <div className={wrapperClass}>
        <Input
          defaultValue={client.email}
          disabled
          label="E-mail"
          type="email"
        />

        <Input
          defaultValue={`+${client.phoneNumber}`}
          disabled
          label="Phone number"
          type="text"
        />
      </div>

      {orders && !!orders.length && (
        <div>
          <p className={labelClass}>Orders: </p>

          <div>
            {orders.map<React.ReactElement>(({ createdAt, id, status, totalPrice }: TOrder) => (
              <p key={`order-phone-${id}`}>
                <Link
                  className={linkClass}
                  href={`/admin/order/${id}`}
                >
                  <span className={idClass}>#{id}</span> {status}, {totalPrice} Kč,{" "}
                  {new Date(createdAt).toLocaleDateString()}
                </Link>
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
