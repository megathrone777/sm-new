"use client";
import { useEffect } from "react";

import type React from "react";

const PrintTrigger: React.FC = () => {
  useEffect((): VoidFunction => {
    const timer: NodeJS.Timeout = setTimeout(() => window.print(), 800);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export { PrintTrigger };
