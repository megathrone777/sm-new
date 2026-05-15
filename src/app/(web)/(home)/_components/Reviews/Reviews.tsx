import React from "react";

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
          {reviews.map(
            ({ count, id, imageUrl, link, linkTitle, ratingImageUrl, text }: TReview): React.ReactElement => (
              <div
                className={itemClass}
                key={`review-${id}`}
              >
                {imageUrl && (
                  <img
                    alt="Image."
                    className={imageClass}
                    src={imageUrl}
                  />
                )}
                <p className={countClass}>{count}</p>
                <p className={textClass}>{text}</p>
                {ratingImageUrl && (
                  <img
                    alt="Rating."
                    className={ratingImageClass}
                    src={ratingImageUrl}
                  />
                )}

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