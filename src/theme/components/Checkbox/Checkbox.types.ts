import type React from "react";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface TProps extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  bold?: true;
  hint?: string;
  label: React.ReactNode | string;
  labelImage?: React.ReactNode;
  template?: "normal" | "small";
}
