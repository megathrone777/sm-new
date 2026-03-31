import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface TProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  href?: __next_route_internal_types__.RouteImpl<string>;
  target?: HTMLAnchorElement["target"];
}
