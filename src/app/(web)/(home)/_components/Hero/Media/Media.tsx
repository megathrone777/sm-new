import React from "react";
import { getImageProps } from "next/image";

import { store } from "@/store";

import { bgImageClass, pictureClass } from "./Media.css"

const Media: React.FC = async () => {
  const { heroMainMobileUrl, heroMainTabletUrl, heroMainUrl } = await store.shop.getSettings();

  const desktop = heroMainUrl
    ? getImageProps({
      alt: "Hero main.",
      fetchPriority: "high",
      height: 1080,
      priority: true,
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
      sizes: "(max-width: 499px) 100vw",
      src: heroMainMobileUrl,
      width: 500,
    }).props.srcSet
    : undefined;

  return (
    <>
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
    </>
  );
};

export { Media };
