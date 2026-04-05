import React from "react";
import Form from "next/form";

import { createSubmodifier, deleteSubmodifier } from "@/app/(auth)/(admin)/_actions";
import { Header } from "@/app/(auth)/(admin)/_components";
import { submodifiersHelpers } from "@/helpers";
import { Button, Input } from "@/ui";

const Page: React.FC = async () => {
  const submodifiers = await submodifiersHelpers.getSubmodifiers();

  return (
    <>
      <Header title="SubModifiers" />

      {!!submodifiers.length && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {submodifiers.map(({ id, title }: TSubmodifier) => (
              <tr key={`submodifier-${id}`}>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                  <Form action={deleteSubmodifier}>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Form action={createSubmodifier}>
        <Input
          label="Title"
          name="title"
          placeholder="New submodifier title"
          type="text"
        />

        <Button
          template="small"
          type="submit"
        >
          Add submodifier
        </Button>
      </Form>
    </>
  );
};

export default Page;
