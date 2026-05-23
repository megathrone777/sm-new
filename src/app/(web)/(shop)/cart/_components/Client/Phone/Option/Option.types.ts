import type React from "react";
import type { BaseOptionType } from "@rc-component/select/lib/Select";
import type { CountryCode } from "use-telephone";

export interface TOptionData extends BaseOptionType {
  label: React.ReactNode;
  value: CountryCode;
}

export interface TProps {
  label?: React.ReactNode;
  value: CountryCode;
}
