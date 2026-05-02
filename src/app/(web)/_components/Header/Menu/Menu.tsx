"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Burger } from "@/ui";

import {
  burgerClass,
  contactClass,
  contactLinkClass,
  layoutClass,
  linkClass,
  listClass,
  wrapperClass,
} from "./Menu.css";

import type { TProps } from "./Menu.types";

const Menu: React.FC<TProps> = ({ items, phone }) => {
  const pathname = usePathname();
  const [isOpened, toggleOpened] = useState<boolean>(false);

  const handleNagigate = (): void => {
    if (isOpened) {
      document.body.removeAttribute("style");
      toggleOpened(false);
    }
  };

  const handleMenuToggle = (): void => {
    toggleOpened(!isOpened);

    if (isOpened) {
      document.body.removeAttribute("style");

      return;
    }

    document.body.style.height = "100dvh";
    document.body.style.overflow = "hidden";
  };

  useEffect((): void => {
    if (isOpened) {
      toggleOpened(false);
    }
  }, [pathname]);

  return (
    <div className={wrapperClass}>
      <div className={layoutClass({ isOpened })}>
        <p className={contactClass}>
          {phone && (
            <a
              className={contactLinkClass}
              href={`tel:${phone.replace(/ /g, "")}`}
            >
              {phone}
            </a>
          )}
        </p>

        <ul className={listClass}>
          {items.map<React.ReactElement>(({ href, title }: TNavItem) => (
            <li key={`menu-item-${href}`}>
              <Link
                {...{ href }}
                className={linkClass[pathname === href ? "active" : "default"]}
                onNavigate={handleNagigate}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Burger
        {...{ isOpened }}
        className={burgerClass}
        onClick={handleMenuToggle}
      />
    </div>
  );
};

export { Menu };
