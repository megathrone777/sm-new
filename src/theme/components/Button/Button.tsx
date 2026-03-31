import React from "react";
import Link from "next/link";

import { buttonClass, linkClass } from "./Button.css";

import type { TProps } from "./Button.types";

const Button: React.FC<TProps> = ({
  children,
  disabled,
  href,
  id,
  onClick,
  target,
  type = "button",
}) =>
  href ? (
    <Link
      {...{ disabled, href, target }}
      className={linkClass}
    >
      {children}
    </Link>
  ) : (
    <button
      {...{ disabled, id, onClick, type }}
      className={buttonClass}
    >
      {children}
    </button>
  );

export { Button };
