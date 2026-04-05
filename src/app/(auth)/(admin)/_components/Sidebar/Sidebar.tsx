"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { toKey } from "@/utils";

import { itemClass, linkClass, wrapperClass } from "./Sidebar.css";

import type { TMenuItem } from "./Sidebar.types";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems: TMenuItem[] = [
    {
      href: "/admin/categories",
      label: "Categories",
    },
    {
      href: "/admin/products",
      label: "Products",
    },
    {
      href: "/admin/modifiers",
      label: "Modifiers",
    },
    {
      href: "/admin/submodifiers",
      label: "SubModifiers",
    },
    {
      href: "/admin/additionals",
      label: "Additionals",
    },
    {
      href: "/admin/orders",
      label: "Orders",
    },
    {
      href: "/admin/clients",
      label: "Clients",
    },
    {
      href: "/admin/settings",
      label: "Shop settings",
    },
    {
      href: "/admin/users",
      label: "Users",
    },
  ];

  return (
    <div className={wrapperClass}>
      <ul>
        {menuItems.map(
          ({ href, label }: TMenuItem): React.ReactElement => (
            <li
              className={itemClass}
              key={`admin-menu-item-${toKey(label)}`}
            >
              <Link
                {...{ href }}
                className={linkClass[pathname === href ? "isActive" : "default"]}
              >
                {label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export { Sidebar };
