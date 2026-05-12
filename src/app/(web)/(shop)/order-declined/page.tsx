import React from "react";
import Image from "next/image";

import { Button, Container } from "@/ui";

import { wrapperClass, imageClass, layoutClass, titleClass } from "./page.css";

const Page: React.FC = () => (
  <div className={wrapperClass}>
    <Container>
      <div className={layoutClass}>
        <h2 className={titleClass}>Transakce ne proběhla úspěšně!</h2>

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
    </Container>
  </div>
);

export default Page;
