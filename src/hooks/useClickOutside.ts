"use client";
import { useEffect } from "react";

import type React from "react";

const useClickOutside = (ref: React.RefObject<HTMLElement | null>, callback: () => void): void => {
  useEffect((): VoidFunction => {
    const handleClickOutside = ({ target }: Event): void => {
      if (ref.current && !ref.current.contains(target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export { useClickOutside };
