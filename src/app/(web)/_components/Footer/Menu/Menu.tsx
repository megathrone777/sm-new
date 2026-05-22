"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { wrapperClass, linkClass, listClass } from "./Menu.css";

import type { TProps } from "./Menu.types";

const Menu: React.FC<TProps> = ({ items }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (event: React.SyntheticEvent<HTMLAnchorElement>): void => {
    const { currentTarget } = event;
    const { hash } = currentTarget;

    if (!hash) return;
    event.preventDefault();

    if (pathname === "/") {
      const section = document.getElementById(hash.replace("#", ""));

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      router.push(("/" + hash) as TNavItem["href"]);
    }
  };

  return (
    <div className={wrapperClass}>
      <ul className={listClass}>
        {items.map(
          ({ href, title }: TNavItem): React.ReactElement => (
            <li key={`${href}-footer-menu-item`}>
              <Link
                {...{ href }}
                className={linkClass[pathname === href ? "active" : "default"]}
                onClick={handleLinkClick}
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
