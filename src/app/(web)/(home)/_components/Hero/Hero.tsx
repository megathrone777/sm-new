import React from "react";
import Image from "next/image";

import { store } from "@/store";
import { Button, Container } from "@/ui";

import {
  bgImageClass,
  contentClass,
  layoutClass,
  textClass,
  titleClass,
  wrapperClass,
} from "./Hero.css";

const Hero: React.FC = async () => {
  const [{ buttonLink, buttonTitle, description, title }, { heroMainUrl }] = await Promise.all([
    store.hero.get(),
    store.shop.getSettings(),
  ]);

  return (
    <div
      className={wrapperClass}
      id="hero-section"
    >
      {heroMainUrl && (
        <Image
          alt="Hero main."
          className={bgImageClass}
          fetchPriority="high"
          fill
          priority
          sizes="100vw"
          src={heroMainUrl}
        />
      )}

      <div className={layoutClass}>
        <Container>
          <div className={contentClass}>
            <h1 className={titleClass}>{title}</h1>

            <p
              className={textClass}
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <Button href={buttonLink}>{buttonTitle}</Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export { Hero };
