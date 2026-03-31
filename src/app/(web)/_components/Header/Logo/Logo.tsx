import React from "react";
import Link from "next/link";

import { wrapperClass, linkClass, imageClass } from "./Logo.css";

import type { TProps } from "./Logo.types";

const Logo: React.FC<TProps> = ({ imageUrl }) => (
  <div className={wrapperClass}>
    <Link
      className={linkClass}
      href="/"
    >
      <img
        alt="Logo."
        className={imageClass}
        src={imageUrl}
      />
    </Link>
  </div>
);

export { Logo };
