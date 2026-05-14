"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Dialog, Icon } from "@/ui";

import { SHOP_CLOSED_EVENT } from "./shopClosed";

import { buttonClass, iconClass, layoutClass, wrapperClass } from "./Controls.css";

import type { TProps } from "./Controls.types";

const Controls: React.FC<TProps> = ({
  closedText,
  closedTitle,
  contactItems,
  isOpened,
  text,
  title,
}) => {
  const pathname = usePathname();
  const [userDialogOpened, toggleUserDialogOpened] = useState<boolean>(false);
  const [closedDialogOpened, toggleClosedDialogOpened] = useState<boolean>(() => !isOpened);
  const [showScroller, toggleScroller] = useState<boolean>(false);

  const handleUserDialogToggle = (): void => {
    toggleUserDialogOpened((prev: boolean): boolean => !prev);
  };

  const handleClosedDialogClose = (): void => {
    toggleClosedDialogOpened(false);
  };

  const handleScrollTop = (): void => {
    document.documentElement.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  useEffect((): void | VoidFunction => {
    const heroSection = document.getElementById("hero-section");

    if (!heroSection) {
      toggleScroller(false);

      return;
    }

    const scrollObserver = new IntersectionObserver(([entry]): void => {
      if (entry) {
        toggleScroller(!entry.isIntersecting);
      }
    });

    scrollObserver.observe(heroSection);

    return (): void => {
      scrollObserver.disconnect();
    };
  }, [pathname]);

  useEffect((): VoidFunction => {
    const onShopClosed = (): void => {
      toggleClosedDialogOpened(true);
    };

    window.addEventListener(SHOP_CLOSED_EVENT, onShopClosed);

    return (): void => {
      window.removeEventListener(SHOP_CLOSED_EVENT, onShopClosed);
    };
  }, []);

  return (
    <>
      <div className={wrapperClass}>
        <div className={layoutClass}>
          {showScroller && (
            <button
              className={buttonClass}
              onClick={handleScrollTop}
              type="button"
            >
              <Icon
                className={iconClass}
                id="arrow"
              />
            </button>
          )}

          <button
            className={buttonClass}
            onClick={handleUserDialogToggle}
            type="button"
          >
            <Icon
              className={iconClass}
              id="chat"
            />
          </button>
        </div>
      </div>

      <Dialog
        {...{ contactItems, text, title }}
        isOpened={userDialogOpened}
        isShopOpen={isOpened}
        onClose={handleUserDialogToggle}
      />

      <Dialog
        {...{ contactItems }}
        isOpened={closedDialogOpened}
        isShopOpen={isOpened}
        onClose={handleClosedDialogClose}
        text={closedText}
        title={closedTitle}
      />
    </>
  );
};

export { Controls };
