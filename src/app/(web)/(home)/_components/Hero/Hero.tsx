import React from "react";

import { store } from "@/store";
import { Button, Container } from "@/ui";

import { contentClass, textClass, titleClass, wrapperClass } from "./Hero.css";

const Hero: React.FC = async () => {
  const [{ buttonLink, buttonTitle, description, title }, { heroMainUrl }] = await Promise.all([
    store.hero.get(),
    store.shop.getSettings(),
  ]);

  return (
    <div
      className={wrapperClass}
      id="hero-section"
      style={{
        backgroundImage: heroMainUrl ? `url('${heroMainUrl}')` : undefined,
      }}
    >
      <Container>
        <div className={contentClass}>
          <h1 className={titleClass}>{title}</h1>

          <p
            className={textClass}
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <Button href={buttonLink as never}>{buttonTitle}</Button>
        </div>
      </Container>
    </div>
  );
};

export { Hero };
