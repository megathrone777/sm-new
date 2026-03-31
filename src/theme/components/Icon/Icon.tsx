import React from "react";

import { viewBox } from "./viewBox";

import type { TProps } from "./Icon.types";

const Icon: React.FC<TProps> = ({ className, id }) => (
  <svg
    className={`
      max-h-full
      ${className && className.length > 0 ? className : ""}
    `}
    preserveAspectRatio="xMidYMid meet"
    viewBox={viewBox[id]}
  >
    <use href={`/sprite.svg#${id}Icon`} />
  </svg>
);

export { Icon };
