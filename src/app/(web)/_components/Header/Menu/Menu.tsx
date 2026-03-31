"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTranslation } from "@/hooks";
import { Burger } from "@/theme/components";
import { toKey } from "@/utils";

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

  const handleMenuToggle = (): void => {
    toggleOpened(!isOpened);
  };

  useEffect((): void => {
    toggleOpened(false);
    document.body.removeAttribute("style");
  }, [pathname]);

  useEffect((): void => {
    if (isOpened) {
      document.body.style.overflow = "hidden";

      return;
    }

    document.body.removeAttribute("style");
  }, [isOpened]);

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
                <li key={`menu-item-${toKey(anchor)}`}>
                  <Link
                    className={linkClass[pathname === anchor ? "isActive" : "default"]}
                    href={anchor}
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
