"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Burger } from "@/ui";

import { Sidebar } from "../Sidebar";

import { burgerWrapperClass, contentClass, layoutClass, overlayClass } from "./AdminBody.css";

import type { TProps } from "./AdminBody.types";

const AdminBody: React.FC<TProps> = ({ children }) => {
  const pathname = usePathname();
  const [isOpened, toggleOpened] = useState<boolean>(false);

  const handleBurgerClick = (): void => {
    toggleOpened((prevOpened: boolean): boolean => !prevOpened);
  };

  useEffect((): void => {
    toggleOpened(false);
  }, [pathname]);

  return (
    <div className={layoutClass}>
      <Sidebar {...{ isOpened }} />

      {isOpened && (
        <div
          className={overlayClass}
          onClick={(): void => {
            toggleOpened(false);
          }}
        />
      )}

      <div className={contentClass}>
        <div className={burgerWrapperClass}>
          <Burger
            {...{ isOpened }}
            onClick={handleBurgerClick}
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export { AdminBody };
