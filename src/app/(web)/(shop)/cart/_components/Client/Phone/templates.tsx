import React from "react";
import { getCountryFlag, type CountryCode } from "use-telephone";

import { Option } from "./Option";

import { labelClass, labelImageClass } from "./Phone.css";

import type { LabelInValueType } from "@rc-component/select/lib/Select";
import type { TOption } from "./Phone.types";

export const labelRender = ({ label, value }: LabelInValueType): React.ReactElement => (
  <span className={labelClass}>
    <img
      alt={`Country flag ${label}`}
      className={labelImageClass}
      src={getCountryFlag(value as CountryCode)}
    />
  </span>
);

export const optionRender = ({ data: { value }, label }: TOption): React.ReactElement => (
  <Option {...{ label, value }} />
);
