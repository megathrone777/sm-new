"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTranslation } from "@/hooks";
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

import type { TMenuItem, TProps } from "./Menu.types";

const Menu: React.FC<TProps> = ({ phone }) => {
  const pathname = usePathname();
  const [isOpened, toggleOpened] = useState<boolean>(false);
  const { t } = useTranslation();
  const menuItems = t<TMenuItem[]>("mainMenu");

  const handleLinkClick = (): void => {
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

    document.documentElement.scrollTop = 0;
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
  };

  useEffect((): void => {
    if (isOpened) {
      toggleOpened(false);
    }
  }, [pathname]);

  return (
    <div className={wrapperClass}>
      <div className={layoutClass[isOpened ? "isOpened" : "default"]}>
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

        {menuItems && !!menuItems.length && (
          <ul className={listClass}>
            {menuItems.map(
              ({ anchor, text }: TMenuItem): React.ReactElement => (
                <li key={`menu-item-${anchor}`}>
                  <Link
                    className={linkClass[pathname === anchor ? "isActive" : "default"]}
                    href={anchor}
                    onClick={handleLinkClick}
                  >
                    {text}
                  </Link>
                </li>
              ),
            )}
          </ul>
        )}
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
