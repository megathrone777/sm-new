import React from "react";
import Image from "next/image";

// import { ThemeComponent } from "~/theme";
import { wrapperClass, titleClass, imageClass } from "./Error.css";

import type { TProps } from "./Error.types";

const Error: React.FC<TProps> = ({ title }) => (
  <div className={wrapperClass}>
    <h1 className={titleClass}>{title}</h1>

    <Image
      alt="Failed."
      className={imageClass}
      fill
      src="/images/failed_img.png"
    />

    {/* <ThemeComponent.Button href="/">Hlavní stránka</ThemeComponent.Button> */}
  </div>
);

export { Error };
