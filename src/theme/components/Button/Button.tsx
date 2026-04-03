import React from "react";
import Link from "next/link";

import { buttonClass, labelClass } from "./Button.css";

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
      className={buttonClass}
    >
      <span className={labelClass}>{children}</span>
    </Link>
  ) : (
    <button
      {...{ disabled, id, onClick, type }}
      className={buttonClass}
    >
      <span className={labelClass}>{children}</span>
    </button>
  );

export { Button };
