import React from "react";

import { Icon } from "@/ui";

import {
  buttonClass,
  dotClass,
  dotsClass,
  modelClass,
  modelIconClass,
  wrapperClass,
} from "./Overlay.css";

import type { TProps } from "./Overlay.types";

const Overlay: React.FC<TProps> = ({ isPending }) => (
  <div className={wrapperClass}>
    {isPending ? (
      <div className={dotsClass}>
        <i className={dotClass} />

        <i
          className={dotClass}
          style={{
            animationDelay: ".2s",
          }}
        />

        <i
          className={dotClass}
          style={{
            animationDelay: ".4s",
          }}
        />
      </div>
    ) : (
      <>
        <p className={modelClass}>
          <span className={modelIconClass} />
          <span>SushiMan AI</span>
        </p>

        <button
          className={buttonClass}
          type="submit"
        >
          <Icon id="arrow" />
        </button>
      </>
    )}
  </div>
);

export { Overlay };
