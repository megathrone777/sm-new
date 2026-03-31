import React from "react";

import { buttonClass, lineClass } from "./Burger.css";

import type { TProps } from "./Burger.types";

const Burger: React.FC<TProps> = ({ className, isOpened, onClick }) => (
  <button
    {...{ onClick }}
    className={`
      ${buttonClass[isOpened ? "isOpened" : "default"]}
      ${className}
    `}
    title="Menu trigger."
    type="button"
  >
    <span className={lineClass[isOpened ? "leftOpened" : "left"]} />
    <span className={lineClass[isOpened ? "middleOpened" : "middle"]} />
    <span className={lineClass[isOpened ? "rightOpened" : "right"]} />
  </button>
);

export { Burger };
