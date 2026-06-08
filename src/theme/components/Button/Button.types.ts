import type { TIconID } from "@/ui";

import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import type { LinkProps } from "next/link";

export interface TProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  href?: LinkProps<string>["href"];
  iconId?: null | TIconID;
  target?: HTMLAnchorElement["target"];
  template?: "normal" | "small";
  withTransition?: true;
}
