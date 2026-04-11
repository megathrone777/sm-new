"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { toKey } from "@/utils";

import { wrapperClass, linkClass, listClass } from "./Menu.css";

import type { TProps } from "./Menu.types";

const Menu: React.FC<TProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <div className={wrapperClass}>
      <ul className={listClass}>
        {items.map(
          ({ href, title }: TNavItem): React.ReactElement => (
            <li key={`${toKey(href)}-footer-menu-item`}>
              <Link
                {...{ href }}
                className={linkClass[pathname === href ? "active" : "default"]}
              >
                {title}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export { Menu };
