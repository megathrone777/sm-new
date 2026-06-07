import type { TIconID } from "@/ui";

import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface TProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  href?: __next_route_internal_types__.RouteImpl<string>;
  iconId?: null | TIconID;
  target?: HTMLAnchorElement["target"];
  template?: "normal" | "small";
  withTransition?: true;
}
