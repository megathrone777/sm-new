"use client";
import React, { useState } from "react";

import { Dialog, Icon } from "@/ui";

import { buttonClass, iconClass, layoutClass, wrapperClass } from "./Schedule.css";

import type { TProps } from "./Schedule.types";

const Schedule: React.FC<TProps> = ({ contactItems, isOpened, text, title }) => {
  const [modalIsOpened, toggleModalOpened] = useState<boolean>(() => !isOpened);

  // const handleModalClose = ()

  const handleModalToggle = (): void => {
    toggleModalOpened(!modalIsOpened);
  };

  return (
    <>
      <div className={wrapperClass}>
        <div className={layoutClass}>
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

export { Schedule };

// const ScheduleDialog: React.FC = () => {
//   return (
//     <>
{
  /* {modalIsOpened && (
        <Dialog
          onClose={handleModalToggle}
          shopIsOpened={isOpened}
          title="Rozvážíme"
          {...{ contactItems, text }}
        />
      )} */
}
//     </>
//   );
// };
