"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import {
  contentClass,
  gridAreaVar,
  headerClass,
  titleClass,
  wrapperClass,
} from "./SectionLayout.css";

import type { TProps } from "./SectionLayout.types";

const SectionLayout: React.FC<TProps> = ({
  children,
  error,
  gridArea,
  heroChildren,
  id,
  title,
}) => {
  useEffect((): void => {
    console.log(error);
    if (error) {
      toast(error, {
        type: "error",
      });
    }
  }, [error]);

  return (
    <div
      {...{ id }}
      className={wrapperClass}
      style={assignInlineVars({ [gridAreaVar]: `${gridArea}` })}
    >
      <div className={headerClass}>
        <h2 className={titleClass}>{title}</h2>
        {heroChildren}
      </div>

      <div className={contentClass}>{children}</div>
    </div>
  );
};

export { SectionLayout };
