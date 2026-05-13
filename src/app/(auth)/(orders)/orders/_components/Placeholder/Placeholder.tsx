import React from "react";
import Image from "next/image";

import { wrapperClass, imageClass, titleClass } from "./Placeholder.css";

const Placeholder: React.FC = () => (
  <div className={wrapperClass}>
    <h2 className={titleClass}>Нет заказов</h2>

    <Image
      alt="Logo."
      className={imageClass}
      height={0}
      priority
      sizes="100vw"
      src="/images/logo_img.svg"
      width={0}
    />
  </div>
);

export { Placeholder };
