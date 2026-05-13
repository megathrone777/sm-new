import React from "react";
import Image from "next/image";

import { store } from "@/store";

import { wrapperClass, imageClass, titleClass } from "./Placeholder.css";

const Placeholder: React.FC = async () => {
  const { logoUrl } = await store.shop.getSettings();

  return (
    <div className={wrapperClass}>
      <h2 className={titleClass}>Нет заказов</h2>

      <Image
        alt="Logo."
        className={imageClass}
        height={0}
        priority
        sizes="100vw"
        src={logoUrl}
        width={0}
      />
    </div>
  );
};

export { Placeholder };
