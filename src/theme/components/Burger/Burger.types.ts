import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface TProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  isOpened: boolean;
}
