import React from "react";
import Form from "next/form";
import Link from "next/link";

import { deleteClient } from "@/app/(auth)/(admin)/_actions";
import { Header } from "@/app/(auth)/(admin)/_components";
import { clientsHelpers } from "@/helpers/clients";
import { ordersHelpers } from "@/helpers/orders";
import { useTranslation } from "@/hooks";
import { Button, Input } from "@/ui";

import {
  idClass,
  labelClass,
  linkClass,
  confirmActionsClass,
  confirmClass,
  confirmTextClass,
  confirmWrapperClass,
  wrapperClass,
} from "./page.css";

const Page: React.FC<PageProps<"/admin/client/[phoneNumber]">> = async ({
  params,
  searchParams,
}) => {
  const { phoneNumber } = await params;
  const { deleteId, deleteTitle } = await searchParams;
  const orders = await ordersHelpers.getOrdersByPhone(phoneNumber);
  const client = await clientsHelpers.getClientByPhone(phoneNumber);
  const { t } = useTranslation();

  if (!client) {
    return <Header title="Client not found." />;
  }

  return (
    <>
      <Header title={`Client: ${client.name}`} />

      {deleteId && (
        <div className={confirmWrapperClass}>
          <div className={confirmClass}>
            <p className={confirmTextClass}>Delete &ldquo;{deleteTitle ?? deleteId}&rdquo;?</p>

            <div className={confirmActionsClass}>
              <Form action={deleteClient}>
                <input
                  name="phoneNumber"
                  type="hidden"
                  value={phoneNumber}
                />

                <Button
                  template="small"
                  type="submit"
                >
                  Delete
                </Button>
              </Form>

              <Link
                href={`/admin/client/${phoneNumber}`}
                scroll={false}
              >
                <Button template="small">Cancel</Button>
              </Link>
            </div>
          </div>
        </div>
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
                    {t<string>("currency")}, {new Date(createdAt).toLocaleDateString()}
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
