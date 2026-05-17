import React from "react";
import { getImageProps } from "next/image";

import { store } from "@/store";
import { Button, Container } from "@/ui";

import {
  bgImageClass,
  contentClass,
  layoutClass,
  pictureClass,
  textClass,
  titleClass,
  wrapperClass,
} from "./Hero.css";

const Hero: React.FC = async () => {
  const [
    { buttonLink, buttonTitle, description, title },
    { heroMainMobileUrl, heroMainTabletUrl, heroMainUrl },
  ] = await Promise.all([store.hero.get(), store.shop.getSettings()]);

  const desktop = heroMainUrl
    ? getImageProps({
      alt: "Hero main.",
      fetchPriority: "high",
      height: 1080,
      priority: true,
      quality: 80,
      sizes: "100vw",
      src: heroMainUrl,
      width: 1920,
    }).props
    : null;

  const tabletSrcSet = heroMainTabletUrl
    ? getImageProps({
      alt: "",
      height: 1080,
      priority: true,
      quality: 80,
      sizes: "(max-width: 767px) 100vw",
      src: heroMainTabletUrl,
      width: 768,
    }).props.srcSet
    : undefined;

  const mobileSrcSet = heroMainMobileUrl
    ? getImageProps({
      alt: "",
      height: 1080,
      priority: true,
      quality: 80,
      sizes: "(max-width: 499px) 100vw",
      src: heroMainMobileUrl,
      width: 500,
    }).props.srcSet
    : undefined;

  return (
    <div
      className={wrapperClass}
      id="hero-section"
    >
      {desktop && (
        <picture className={pictureClass}>
          {mobileSrcSet && (
            <source
              media="(max-width: 499px)"
              srcSet={mobileSrcSet}
            />
          )}

          {tabletSrcSet && (
            <source
              media="(max-width: 767px)"
              srcSet={tabletSrcSet}
            />
          )}

          <img
            alt={desktop.alt}
            className={bgImageClass}
            decoding={desktop.decoding}
            fetchPriority="high"
            loading={desktop.loading}
            sizes="100vw"
            src={desktop.src}
            srcSet={desktop.srcSet}
          />
        </picture>
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
