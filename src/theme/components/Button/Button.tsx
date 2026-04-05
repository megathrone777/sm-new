import React from "react";
import Link from "next/link";

import { Icon } from "@/ui";

import { buttonClass, iconClass } from "./Button.css";

import type { TProps } from "./Button.types";

const Button: React.FC<TProps> = ({
  children,
  disabled,
  href,
  iconId,
  id,
  onClick,
  target,
  template = "normal",
  type = "button",
}) =>
  href ? (
    <Link
      {...{ disabled, href, target }}
      className={buttonClass[template]}
    >
      {children}
    </Link>
  ) : (
    <button
      {...{ disabled, id, onClick, type }}
      className={buttonClass[template]}
    >
      {iconId ? (
        <Icon
          className={iconClass}
          id={iconId}
        />
      ) : (
        children
      )}
    </button>
  );

export { Button };
