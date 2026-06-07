import React from "react";
import Link from "next/link";

import { deleteClient } from "@/app/(auth)/(admin)/_actions";
import { Header } from "@/app/(auth)/(admin)/_components";
import { DeleteAlert } from "@/app/(auth)/_components";
import { getTranslation } from "@/dictionaries";
import { store } from "@/store";
import { Button, Input } from "@/ui";

import { idClass, labelClass, linkClass, wrapperClass } from "./page.css";

const Page: React.FC<PageProps<"/admin/client/[phoneNumber]">> = async ({
  params,
  searchParams,
}) => {
  const { phoneNumber } = await params;
  const { deleteId, deleteTitle } = await searchParams;
  const orders = await store.orders.getByPhone(phoneNumber);
  const client = await store.clients.getByPhone(phoneNumber);

  if (!client) {
    return <Header title="Client not found." />;
  }

  return (
    <>
      <Header title={`Client: ${client.name}`} />

      {deleteId && (
        <DeleteAlert
          action={deleteClient}
          deleteId={`${deleteId}`}
          deleteTitle={deleteTitle ? `${deleteTitle}` : null}
          href={`/admin/client/${phoneNumber}` as __next_route_internal_types__.RouteImpl<string>}
        />
      )}

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

      <div className={wrapperClass}>
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
                    <span className={idClass}>#{id}</span> {status}, {totalPrice}{" "}
                    {getTranslation<string>("currency")}, {new Date(createdAt).toLocaleDateString()}
                  </Link>
                </p>
              ))}
            </div>
          </div>
        )}

        <div>
          <Link
            href={`/admin/client/${phoneNumber}?deleteId=${phoneNumber}&deleteTitle=${encodeURIComponent(client.name)}`}
            scroll={false}
          >
            <Button
              iconId="trash"
              template="small"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
