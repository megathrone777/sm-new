import React from "react";
import Image from "next/image";

import { useTranslation } from "@/hooks";
import { Button } from "@/ui";

import { wrapperClass, imageClass, imageHolderClass } from "./Placeholder.css";

const Placeholder: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={wrapperClass}>
      {t<string>("cartIsEmpty")}

      <div className={imageHolderClass}>
        <Image
          alt="Sushi man"
          className={imageClass}
          height={0}
          sizes="100vw"
          src="/images/failed_img.png"
          width={0}
        />
      </div>

      <Button href="/">Hlavní stránka</Button>
    </div>
  );
};

export { Placeholder };
