import type React from "react";
import type { CountryCode } from "use-telephone";

export interface TOption {
  label: React.ReactNode;
  value: CountryCode;
}

export type TProps = TOption;
