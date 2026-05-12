import React from "react";
import Image from "next/image";

import { useTranslation } from "@/hooks";
import { Button } from "@/ui";

import { wrapperClass, imageClass } from "./Placeholder.css";

const Placeholder: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={wrapperClass}>
      {t<string>("cartIsEmpty")}

      <Image
        alt="Sushi man"
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
};

export { Placeholder };
