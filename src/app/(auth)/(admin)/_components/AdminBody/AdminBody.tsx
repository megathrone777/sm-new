"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { Burger } from "@/ui";

import { Sidebar } from "../Sidebar";

import { burgerWrapperClass, contentClass, layoutClass, overlayClass } from "./AdminBody.css";

import type { TProps } from "./AdminBody.types";

const AdminBody: React.FC<TProps> = ({ children }) => {
  const pathname = usePathname();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [prevPathname, setPrevPathname] = useState<string>(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpened(false);
  }

  const handleBurgerClick = (): void => {
    setIsOpened((prevOpened: boolean): boolean => !prevOpened);
  };

  return (
    <div className={layoutClass}>
      <Sidebar {...{ isOpened }} />

      {isOpened && (
        <div
          className={overlayClass}
          onClick={(): void => {
            setIsOpened(false);
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
