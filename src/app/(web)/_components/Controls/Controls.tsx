"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const [userDialogOpened, setUserDialogOpened] = useState<boolean>(false);
  const [closedDialogOpened, setClosedDialogOpened] = useState<boolean>(() => !isOpened);
  const [showScroller, setShowScroller] = useState<boolean>(false);
  const [prevPathname, setPrevPathname] = useState<string>(pathname);
  const isMountedRef = useRef(false);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setShowScroller(false);
  }

  const handleUserDialogToggle = (): void => {
    setUserDialogOpened((prevOpened: boolean): boolean => !prevOpened);
  };

  const handleClosedDialogClose = (): void => {
    setClosedDialogOpened(false);
  };

  const handleScrollTop = (): void => {
    document.documentElement.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  useEffect((): void => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;

      return;
    }

    if (!location.hash) {
      document.documentElement.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect((): void | VoidFunction => {
    const heroSection = document.getElementById("hero-section");

    if (!heroSection) return;

    const scrollObserver = new IntersectionObserver(([entry]): void => {
      if (entry) {
        setShowScroller(!entry.isIntersecting);
      }
    });

    scrollObserver.observe(heroSection);

    return (): void => {
      scrollObserver.disconnect();
    };
  }, [pathname]);

  useEffect((): VoidFunction => {
    const onShopClosed = (): void => {
      setClosedDialogOpened(true);
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
              aria-label="Scroll to top"
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
            aria-label="Open schedule dialog"
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
