import React from "react";
import Form from "next/form";

import {
  createAdditional,
  deleteAdditional,
  updateAdditional,
} from "@/app/(auth)/(admin)/_actions";
import { Header } from "@/app/(auth)/(admin)/_components";
import { additionalsHelpers } from "@/helpers";
import { Button, Input } from "@/ui";

import { createFormClass, formClass, itemClass, listClass } from "./page.css";

const Page: React.FC = async () => {
  const additionals = await additionalsHelpers.getAdditionals();

  return (
    <>
      <Header title="Additionals" />

      <Form
        action={createAdditional}
        className={createFormClass}
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

        <Button
          template="small"
          type="submit"
        >
          Add additional
        </Button>
      </Form>

      {!!additionals.length && (
        <div className={listClass}>
          {additionals.map(
            ({ id, price, sortOrder, title }: TAdditional): React.ReactElement => (
              <div
                className={itemClass}
                key={`additional-${id}`}
              >
                <Form
                  action={updateAdditional}
                  className={formClass}
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

                  <Button
                    template="small"
                    type="submit"
                  >
                    Save
                  </Button>
                </Form>

                <Form action={deleteAdditional}>
                  <input
                    name="id"
                    type="hidden"
                    value={id}
                  />

                  <Button
                    template="small"
                    type="submit"
                  >
                    Delete
                  </Button>
                </Form>
              </div>
            ),
          )}
        </div>
      )}
    </>
  );
};

export default Page;
