import React from "react";

import { Icon } from "@/ui";

import { Chips } from "./Chips";
import { FormLayout } from "./FormLayout";

import {
  buttonClass,
  contentClass,
  modelClass,
  modelIconClass,
  titleClass,
  wrapperClass,
} from "./Agent.css";

const Agent: React.FC = () => (
  <div className={wrapperClass}>
    <h2 className={titleClass}>Na co máte chut'?</h2>

    <div className={contentClass}>
      <FormLayout>
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
      </FormLayout>
    </div>

    <Chips />
  </div>
);

export { Agent };
