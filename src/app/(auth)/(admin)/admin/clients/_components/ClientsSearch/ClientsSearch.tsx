"use client";
import React from "react";
import Link from "next/link";

import { searchClients } from "@/app/(auth)/(admin)/_actions";
import { Search } from "@/app/(auth)/_components";

import { itemClass, listClass, linkClass, phoneClass, textClass } from "./ClientsSearch.css";

const ClientsSearch: React.FC = () => (
  <Search<TClient> searchAction={searchClients}>
    {(results): React.ReactElement => (
      <ul className={listClass}>
        {results.map<null | React.ReactElement>(({ email, name, phoneNumber }: TClient) =>
          phoneNumber ? (
            <li
              className={itemClass}
              key={`search-client-${phoneNumber}`}
            >
              <Link
                className={linkClass}
                href={`/admin/client/${phoneNumber}`}
              >
                <span className={phoneClass}>+{phoneNumber}</span>
                <span>|</span>
                <span className={textClass}>{name}</span>
                <span>|</span>
                <span className={textClass}>{email}</span>
              </Link>
            </li>
          ) : null,
        )}
      </ul>
    )}
  </Search>
);

export { ClientsSearch };
