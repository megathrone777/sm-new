"use client";
import React from "react";
import {
  cssTransition,
  ToastContainer,
  type CloseButtonProps,
  type IconProps,
  type TypeOptions,
} from "react-toastify";

import { Icon } from "@/ui";

import { closeButtonClass, containerClass, iconClass, toastClass } from "./Toasts.css";

const Toasts: React.FC = () => {
  const slideTransition = cssTransition({
    appendPosition: true,
    collapse: false,
    enter: "Toastify__toast-slideInUp",
    exit: "Toastify__toast-slideOutDown",
  });

  return (
    <ToastContainer
      autoClose={3500}
      className={containerClass}
      closeButton={({ closeToast }: CloseButtonProps): React.ReactElement => (
        <button
          className={closeButtonClass}
          onClick={closeToast}
          type="button"
        >
          <Icon id="close" />
        </button>
      )}
      closeOnClick={false}
      draggable={false}
      hideProgressBar
      icon={({ type }: IconProps): React.ReactElement => (
        <span className={iconClass[type as Extract<TypeOptions, "error" | "success">]}>
          {type === "success" && <Icon id="checkmark" />}
          {type === "error" && <Icon id="close" />}
        </span>
      )}
      newestOnTop
      pauseOnHover
      position="bottom-right"
      toastClassName={toastClass}
      transition={slideTransition}
    />
  );
};

export { Toasts };
