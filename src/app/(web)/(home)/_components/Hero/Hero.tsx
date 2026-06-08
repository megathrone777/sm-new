import React from "react";

import { store } from "@/store";
import { Container } from "@/ui";

import { Agent } from "./Agent";
import { Media } from "./Media";

import {
  contentClass,
  heroClass,
  layoutClass,
  textClass,
  titleClass,
  wrapperClass,
} from "./Hero.css";

const Hero: React.FC = async () => {
  const { description, title } = await store.hero.get();

  return (
    <div
      className={wrapperClass}
      id="hero-section"
    >
      <Media />

      <div className={layoutClass}>
        <Container>
          <div className={contentClass}>
            <div className={heroClass}>
              <h1 className={titleClass}>{title}</h1>

              <p
                className={textClass}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>

            <Agent />
          </div>
        </Container>
      </div>
    </div>
  );
};

export { Hero };
