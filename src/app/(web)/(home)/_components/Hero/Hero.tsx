import React from "react";

import { Button, Container } from "@/ui";

import { contentClass, textClass, titleClass, wrapperClass } from "./Hero.css";

import type { THeroData } from "./Hero.types";

const Hero: React.FC = async () => {
  const getData = async (): Promise<THeroData> => {
    return {
      bgImageUrl: "/uploads/hero/hero_img.jpg",
      buttonMenuLink: "/menu",
      buttonMenuTitle: "Objednat",
      description: `
        Exkluzivní pokrmy a servis, příjemné prostředí, chill zone a spoustu koktejlů!
        Rezervujte si stůl už teď.<br><br>Na Rozvoz pracujeme od 11:00.<br>
        Restaurace otevírá od 17:00.
      `,
      title: "NOVINKA od Sushi Man! Udon a Sushi Burger!",
    };
  };
  const { bgImageUrl, buttonMenuLink, buttonMenuTitle, description, title } = await getData();

  return (
    <div
      className={wrapperClass}
      id="hero-section"
      style={{
        backgroundImage: `url('${bgImageUrl}')`,
      }}
    >
      <Container>
        <div className={contentClass}>
          <h1 className={titleClass}>{title.trimStart()}</h1>

          <p
            className={textClass}
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <Button href={buttonMenuLink}>{buttonMenuTitle}</Button>
        </div>
      </Container>
    </div>
  );
};

export { Hero };
