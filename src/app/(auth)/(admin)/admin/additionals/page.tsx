import React from "react";
import Link from "next/link";

import {
  createAdditional,
  deleteAdditional,
  updateAdditional,
} from "@/app/(auth)/(admin)/_actions";
import { Header } from "@/app/(auth)/(admin)/_components";
import { DeleteAlert, FormLayout } from "@/app/(auth)/_components";
import { additionalsHelpers } from "@/helpers";
import { Button, Input } from "@/ui";

import { createFormClass, itemClass, itemFormClass, linkClass, listClass } from "./page.css";

const Page: React.FC<PageProps<"/admin/additionals">> = async ({ searchParams }) => {
  const params = await searchParams;
  const deleteId = Array.isArray(params.deleteId)
    ? (params.deleteId[0] ?? null)
    : (params.deleteId ?? null);
  const deleteTitle = Array.isArray(params.deleteTitle)
    ? (params.deleteTitle[0] ?? null)
    : (params.deleteTitle ?? null);
  const additionals = await additionalsHelpers.getAdditionals();

  return (
    <>
      <Header title="Additionals" />

      {deleteId && (
        <DeleteAlert
          action={deleteAdditional}
          deleteId={deleteId}
          deleteTitle={deleteTitle}
          href="/admin/additionals"
        />
      )}

      <FormLayout
        className={createFormClass}
        formAction={createAdditional}
      >
        <Input
          label="Title"
          name="title"
          placeholder="New additional title"
          type="text"
        />

        <Input
          defaultValue="0"
          label="Price (Kč)"
          name="price"
          type="number"
        />

        <Input
          defaultValue="0"
          label="Sort order"
          name="sortOrder"
          type="number"
        />
      </FormLayout>

      {!!additionals.length && (
        <div className={listClass}>
          {additionals.map(
            ({ id, price, sortOrder, title }: TAdditional): React.ReactElement => (
              <div
                className={itemClass}
                key={`additional-${id}`}
              >
                <FormLayout
                  className={itemFormClass}
                  formAction={updateAdditional}
                >
                  <input
                    name="id"
                    type="hidden"
                    value={id}
                  />

                  <Input
                    defaultValue={title}
                    label="Title"
                    name="title"
                    type="text"
                  />

                  <Input
                    defaultValue={price}
                    label="Price (Kč)"
                    name="price"
                    type="number"
                  />

                  <Input
                    defaultValue={sortOrder}
                    label="Sort order"
                    name="sortOrder"
                    type="number"
                  />
                </FormLayout>

                <Link
                  className={linkClass}
                  href={`/admin/additionals?deleteId=${id}&deleteTitle=${encodeURIComponent(title)}`}
                  scroll={false}
                >
                  <Button
                    iconId="trash"
                    template="small"
                  />
                </Link>
              </div>
            ),
          )}
        </div>
      )}
    </>
  );
};

export default Page;
