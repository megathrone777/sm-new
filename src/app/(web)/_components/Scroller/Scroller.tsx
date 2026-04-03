"use client";
import React from "react";

import { Icon } from "@/ui";

import { buttonClass, iconClass, layoutClass, wrapperClass } from "./Scroller.css";

const Scroller: React.FC = () => {
  const handleScrollTop = (): void => {
    document.documentElement.scrollTo({
      top: 0,
    });
  };

  return (
    <div className={wrapperClass}>
      <div className={layoutClass}>
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
      </div>
    </div>
  );
};

export { Scroller };
