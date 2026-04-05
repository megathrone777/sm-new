import type { TIconID } from "@/ui";

import type { InputHTMLAttributes, DetailedHTMLProps } from "react";

export interface TProps extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  iconId?: TIconID;
  isError?: boolean;
  label?: string;
}
