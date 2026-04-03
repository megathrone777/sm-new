"use client";
import React from "react";

import { Icon } from "@/ui";

import {
  closeButtonClass,
  headerClass,
  layoutClass,
  overlayClass,
  wrapperClass,
} from "./Dialog.css";

import type { TProps } from "./Dialog.types";

const Dialog: React.FC<TProps> = ({ isOpened, onClose, title }) => {
  const handleLayoutClick = (event: React.SyntheticEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  };

  return (
    <div className={wrapperClass}>
      <div
        className={overlayClass[isOpened ? "isOpened" : "default"]}
        onClick={onClose}
      >
        <div
          className={layoutClass}
          onClick={handleLayoutClick}
        >
          <div className={headerClass}>
            <button
              className={closeButtonClass}
              onClick={onClose}
              type="button"
            >
              <Icon id="close" />
            </button>
          </div>

          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export { Dialog };
