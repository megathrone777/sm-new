"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Dialog, Icon } from "@/ui";

import { buttonClass, iconClass, layoutClass, wrapperClass } from "./Controls.css";

import type { TProps } from "./Controls.types";

const Controls: React.FC<TProps> = ({ contactItems, isOpened, text, title }) => {
  const pathname = usePathname();
  const [modalIsOpened, toggleModalOpened] = useState<boolean>(() => !isOpened);
  const [showScroller, toggleScroller] = useState<boolean>(false);

  const handleModalToggle = (): void => {
    toggleModalOpened(!modalIsOpened);
  };

  const handleScrollTop = (): void => {
    document.documentElement.scrollTo({
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
            onClick={handleModalToggle}
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
        isOpened={modalIsOpened}
        onClose={handleModalToggle}
      />
    </>
  );
};

export { Controls };
