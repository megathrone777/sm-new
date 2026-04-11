import React from "react";
import Link from "next/link";

import { deleteClient } from "@/app/(auth)/(admin)/_actions";
import { ListLayout } from "@/app/(auth)/(admin)/_components";
import { clientsHelpers } from "@/helpers/clients";
import { Button } from "@/ui";

import { headerClass, listClass, linkClass, itemClass } from "./ClientsList.css";

const ClientsList: React.FC = async () => {
  const clients = await clientsHelpers.getClients();

  return (
    <ListLayout
      deleteAction={deleteClient}
      href="/admin/clients"
    >
      <div className={headerClass}>
        <p>Client name</p>
        <p>E-mail</p>
        <p>Phone number</p>
        <p>Actions</p>
      </div>

      {clients && !!clients.length && (
        <div className={listClass}>
          {clients.map<React.ReactElement>(({ email, name, phoneNumber }: TClient) => (
            <div
              className={itemClass}
              key={`admin-client-list-item-${phoneNumber}`}
            >
              <Link
                className={linkClass}
                href={`/admin/client/${phoneNumber}`}
              >
                <p>{name}</p>
                <p>{email}</p>
                <p>+{phoneNumber}</p>
              </Link>

              <Link
                href={`/admin/clients?deleteId=${phoneNumber}&deleteTitle=${encodeURIComponent(name)}`}
                scroll={false}
              >
                <Button
                  iconId="trash"
                  template="small"
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </ListLayout>
  );
};

export { ClientsList };
