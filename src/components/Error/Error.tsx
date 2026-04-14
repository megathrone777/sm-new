import React from "react";
import Image from "next/image";

import { Button } from "@/ui";

import { wrapperClass, titleClass, imageClass } from "./Error.css";

import type { TProps } from "./Error.types";

const Error: React.FC<TProps> = ({ title }) => (
  <div className={wrapperClass}>
    <h1 className={titleClass}>{title}</h1>

    <Image
      alt="Failed."
      className={imageClass}
      height={0}
      preload
      sizes="100vw"
      src="/images/failed_img.png"
      width={0}
    />

    <Button href="/">Hlavní stránka</Button>
  </div>
);

export { Error };
