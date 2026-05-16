import React from "react";
import Image from "next/image";
import Link from "next/link";

import { imageClass, wrapperClass, linkClass } from "./Logo.css";

import type { TProps } from "./Logo.types";

const Logo: React.FC<TProps> = ({ imageUrl }) => (
  <div className={wrapperClass}>
    <Link
      className={linkClass}
      href="/"
    >
      <Image
        alt="Logo."
        className={imageClass}
        height={98}
        priority
        sizes="98px"
        src={imageUrl}
        width={98}
      />
    </Link>
  </div>
);

export { Logo };
