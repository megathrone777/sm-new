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

  const checkMenu = (): void => {
    if (isOpened) {
      toggleOpened(false);
      document.body.removeAttribute("style");
    }
  };

  const handleLinkClick = (event: React.SyntheticEvent<HTMLAnchorElement>): void => {
    const { currentTarget } = event;
    const { hash } = currentTarget;

    checkMenu();

    if (hash && pathname === "/") {
      event.preventDefault();
      const section = document.getElementById(currentTarget.hash.replace("#", ""));

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
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

  const handleLinkNavigate = (): void => {
    checkMenu();
  };

  useEffect((): void => {
    checkMenu();
  }, [pathname]);

  return (
    <div className={wrapperClass}>
      <div className={layoutClass[isOpened ? "opened" : "closed"]}>
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
                onClick={handleLinkClick}
                onNavigate={handleLinkNavigate}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={burgerClass}>
        <Burger
          {...{ isOpened }}
          onClick={handleMenuToggle}
        />
      </div>
    </div>
  );
};

export { Menu };
