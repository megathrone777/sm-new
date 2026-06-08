import React from "react";

import { store } from "@/store";
import { Container } from "@/ui";
import { splitText } from "@/utils";

import { Agent } from "./Agent";

import { contentClass, heroClass, textClass, titleClass, wrapperClass } from "./Hero.css";

const Hero: React.FC = async () => {
  const [{ description, title }, { heroMainUrl }] = await Promise.all([
    store.hero.get(),
    store.shop.getSettings(),
  ]);
  const [titleLine1, titleLine2] = splitText(title, 2);

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
          <div className={heroClass}>
            <h1 className={titleClass}>
              {titleLine1}
              <br />
              {titleLine2}
            </h1>

            <p
              className={textClass}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          <Agent />
        </div>
      </Container>
    </div>
  );
};

export { Hero };
