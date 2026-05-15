import React from "react";
import Link from "next/link";

import { deleteReview, updateReview, updateReviewImage } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, ImageUploader, ListLayout } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";
import { Button, Input } from "@/ui";

import {
  itemClass,
  itemFormClass,
  itemHeaderClass,
  linkClass,
  listClass,
} from "./ReviewsList.css";

const ReviewsList: React.FC = async () => {
  const reviews = await store.reviews.getAll();

  return (
    <ListLayout
      deleteAction={deleteReview}
      href="/admin/reviews"
    >
      {reviews && !!reviews.length && (
        <div className={listClass}>
          {reviews.map(
            ({
              count,
              id,
              imageUrl,
              link,
              linkTitle,
              text,
            }: TReview): React.ReactElement => (
              <div
                className={itemClass}
                key={`review-${id}`}
              >
                <div className={itemHeaderClass}>
                  <FormLayout formAction={updateReviewImage}>
                    <input
                      name="id"
                      type="hidden"
                      value={id}
                    />

                    <input
                      name="key"
                      type="hidden"
                      value="imageUrl"
                    />

                    <ImageUploader initialUrl={imageUrl} />
                  </FormLayout>

                  <Link
                    className={linkClass}
                    href={`/admin/reviews?deleteId=${id}&deleteTitle=${encodeURIComponent(`${count} - ${text}`)}`}
                    scroll={false}
                  >
                    <Button
                      iconId="trash"
                      template="small"
                    />
                  </Link>
                </div>

                <FormLayout
                  formAction={updateReview}
                  layoutClassName={itemFormClass}
                >
                  <input
                    name="id"
                    type="hidden"
                    value={id}
                  />

                  <Input
                    defaultValue={count}
                    label="Count"
                    name="count"
                    type="text"
                  />

                  <Input
                    defaultValue={text}
                    label="Text"
                    name="text"
                    type="text"
                  />

                  <Input
                    defaultValue={link}
                    label="Link"
                    name="link"
                    type="text"
                  />

                  <Input
                    defaultValue={linkTitle}
                    label="Link title"
                    name="linkTitle"
                    type="text"
                  />
                </FormLayout>
              </div>
            ),
          )}
        </div>
      )}
    </ListLayout>
  );
};

export { ReviewsList };
