"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/ui";

import { iconClass, wrapperClass, linkClass } from "./Menu.css";

import type { TProps } from "./Menu.types";

const Menu: React.FC<TProps> = ({ role }) => {
  const pathname = usePathname();

  return (
    <div className={wrapperClass}>
      <Link
        className={linkClass[pathname === "/orders" ? "active" : "default"]}
        href="/orders"
      >
        <Icon
          className={iconClass}
          id="buy"
        />

        <span>Orders</span>
      </Link>

      {role === "admin" && (
        <Link
          className={linkClass[pathname === "/tracker" ? "active" : "default"]}
          href="/tracker"
        >
          <Icon
            className={iconClass}
            id="locate"
          />

          <span>Tracker</span>
        </Link>
      )}

      <Link
        className={linkClass["default"]}
        href="/"
        target="_blank"
      >
        <Icon
          className={iconClass}
          id="globe"
        />

        <span>Web</span>
      </Link>
    </div>
  );
};

export { Menu };
