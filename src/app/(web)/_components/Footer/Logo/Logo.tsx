import React from "react";
import Image from "next/image";
import Link from "next/link";

import { wrapperClass, imageClass, linkClass } from "./Logo.css";

import type { TProps } from "./Logo.types";

const Logo: React.FC<TProps> = ({ imageUrl }) => (
  <div className={wrapperClass}>
    <Link
      className={linkClass}
      href="/"
    >
      <Image
        alt="Sushi man."
        className={imageClass}
        height={0}
        sizes="100vw"
        src={imageUrl}
        width={0}
      />
    </Link>
  </div>
);

export { Logo };
