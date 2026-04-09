"use client";
import React from "react";
import Link from "next/link";

import { searchClients } from "@/app/(auth)/(admin)/_actions";
import { Search } from "@/app/(auth)/_components";

import { itemClass, listClass, linkClass, phoneClass } from "./ClientsSearch.css";

const ClientsSearch: React.FC = () => (
  <Search<TClient> searchAction={searchClients}>
    {(results): React.ReactElement => (
      <ul className={listClass}>
        {results.map<React.ReactElement>(({ email, name, phoneNumber }: TClient) => (
          <li
            className={itemClass}
            key={`search-client-${phoneNumber}`}
          >
            <Link
              className={linkClass}
              href={`/admin/client/${phoneNumber}`}
            >
              <span className={phoneClass}>+{phoneNumber}</span>
              <span>{name}</span>
              <span>{email}</span>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </Search>
);

export { ClientsSearch };
