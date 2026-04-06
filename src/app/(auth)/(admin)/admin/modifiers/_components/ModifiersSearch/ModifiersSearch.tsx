"use client";
import React from "react";
import Link from "next/link";

import { searchModifiers } from "@/app/(auth)/(admin)/_actions";
import { Search } from "@/app/(auth)/_components";

import { listClass, linkClass } from "./ModifiersSearch.css";

const ModifiersSearch: React.FC = () => (
  <Search searchAction={searchModifiers}>
    {(results): React.ReactElement => (
      <ul className={listClass}>
        {results.map(({ id, title }) => (
          <li key={`search-modifier-${id}`}>
            <Link
              className={linkClass}
              href={`/admin/modifier/${id}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </Search>
);

export { ModifiersSearch };
