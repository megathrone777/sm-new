"use client";
import React from "react";

import { ContactLinks } from "@/ui";
import { Icon } from "@/ui";

import {
  closeButtonClass,
  contactClass,
  headerClass,
  layoutClass,
  overlayClass,
  scheduleClass,
  statusClass,
  titleClass,
  wrapperClass,
} from "./Dialog.css";

import type { TProps } from "./Dialog.types";

const Dialog: React.FC<TProps> = ({ contactItems, isOpened, isShopOpen, onClose, text, title }) => {
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

          <h2 className={titleClass}>{title}</h2>

          <p
            className={scheduleClass}
            dangerouslySetInnerHTML={{ __html: text }}
          />

          <div className={contactClass}>
            <ContactLinks items={contactItems} />
          </div>

          <p className={statusClass[isShopOpen ? "online" : "offline"]}>
            {isShopOpen ? "online" : "offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export { Dialog };
