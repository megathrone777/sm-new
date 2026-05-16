"use client";
import React from "react";

import { Button } from "@/ui";

import type { TProps } from "./PrintBar.types";

const PrintBar: React.FC<TProps> = ({ className }) => (
  <div className={className}>
    <Button
      onClick={() => window.print()}
      template="small"
      type="button"
    >
      Tisknout / Uložit PDF
    </Button>

    <Button
      onClick={() => window.close()}
      template="small"
      type="button"
    >
      Zavřít
    </Button>
  </div>
);

export { PrintBar };
