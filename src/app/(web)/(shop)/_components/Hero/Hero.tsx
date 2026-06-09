import React from "react";

import { Agent } from "@/app/(web)/_components";
import { store } from "@/store";
import { Container } from "@/ui";
import { splitText } from "@/utils";

import { contentClass, heroClass, textClass, titleClass, wrapperClass } from "./Hero.css";

const Hero: React.FC = async () => {
  const [{ description, title }, { heroPagesUrl }] = await Promise.all([
    store.hero.get(),
    store.shop.getSettings(),
  ]);
  const [titleLine1, titleLine2] = splitText(title, 2);

  return (
    <div
      className={wrapperClass}
      id="hero-section"
      style={{
        backgroundImage: heroPagesUrl ? `url('${heroPagesUrl}')` : undefined,
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

          <Agent
            placeholder="Poraďte se s námi — přidáme, odebereme, doporučíme..."
            showChips={false}
            title="Váš sushi průvodce"
          />
        </div>
      </Container>
    </div>
  );
};

export { Hero };
