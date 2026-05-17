import React from "react";
import Image from "next/image";

import { store } from "@/store";
import { Button, Container } from "@/ui";

import {
  buttonsClass,
  countClass,
  imageClass,
  itemClass,
  linkClass,
  listClass,
  ratingImageClass,
  textClass,
  titleClass,
  wrapperClass,
} from "./Reviews.css";

const Reviews: React.FC = async () => {
  const reviews = await store.reviews.getAll();

  return (
    <div
      className={wrapperClass}
      id="reviews-section"
    >
      <Container>
        <h2 className={titleClass}>Recenze</h2>

        <div className={listClass}>
          {reviews.map<React.ReactElement>(
            ({ count, id, imageUrl, link, linkTitle, text }: TReview) => (
              <div
                className={itemClass}
                key={`review-${id}`}
              >
                {imageUrl && (
                  <Image
                    alt="Image."
                    className={imageClass}
                    height={100}
                    src={imageUrl}
                    width={100}
                  />
                )}

                <p className={countClass}>{count}</p>
                <p className={textClass}>{text}</p>

                <Image
                  alt="Rating."
                  className={ratingImageClass}
                  height={24}
                  src="/images/rating_img.jpg"
                  width={120}
                />

                <a
                  className={linkClass}
                  href={link}
                  target="_blank"
                >
                  {linkTitle}
                </a>
              </div>
            ),
          )}
        </div>

        <div className={buttonsClass}>
          <Button
            href="/menu"
            type="button"
          >
            Objednat
          </Button>
        </div>
      </Container>
    </div>
  );
};

export { Reviews };
