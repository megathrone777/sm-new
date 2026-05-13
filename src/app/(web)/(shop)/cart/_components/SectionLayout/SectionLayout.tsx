import React from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import {
  contentClass,
  gridAreaVar,
  headerClass,
  titleClass,
  wrapperClass,
} from "./SectionLayout.css";

import type { TProps } from "./SectionLayout.types";

const SectionLayout: React.FC<TProps> = ({ children, gridArea, heroChildren, id, title }) => (
  <div
    {...{ id }}
    className={wrapperClass}
    style={gridArea ? { ...assignInlineVars({ [gridAreaVar]: `${gridArea}` }) } : undefined}
  >
    <div className={headerClass}>
      <h2 className={titleClass}>{title}</h2>
      {heroChildren}
    </div>

    <div className={contentClass}>{children}</div>
  </div>
);

export { SectionLayout };
