import React from "react";
import Form from "next/form";
import Link from "next/link";

import { createModifier, deleteModifier } from "@/app/(auth)/(admin)/_actions";
import { Header } from "@/app/(auth)/(admin)/_components";
import { modifiersHelpers, submodifiersHelpers } from "@/helpers";
import { Button, Input } from "@/ui";

import { headerClass } from "./page.css";

const Page: React.FC = async () => {
  const [modifiers, submodifiers] = await Promise.all([
    modifiersHelpers.getModifiers(),
    submodifiersHelpers.getSubmodifiers(),
  ]);

  return (
    <>
      <Header title="Modifiers" />

      <div className={headerClass}>
        <p>ID</p>
        <p>Title</p>
        <p>Price (CZK)</p>
      </div>

      {!!modifiers.length && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Submodifiers</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {modifiers.map(({ id, price, subModifiers, title }: TModifier) => (
              <tr key={`modifier-${id}`}>
                <td>{id}</td>
                <td>
                  <Link
                    href={
                      `/admin/modifier/${String(id)}` as __next_route_internal_types__.RouteImpl<string>
                    }
                  >
                    {title}
                  </Link>
                </td>
                <td>{price} Kč</td>
                <td>{(subModifiers ?? []).map(({ title: t }) => t).join(", ") || "—"}</td>
                <td>
                  <Form action={deleteModifier}>
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

      <Form action={createModifier}>
        <Input
          label="Title"
          name="title"
          placeholder="New modifier title"
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

        <label>
          <input
            name="requiredSubModifier"
            type="checkbox"
          />{" "}
          Required submodifier
        </label>

        {!!submodifiers.length && (
          <fieldset>
            <legend>Submodifiers</legend>
            {submodifiers.map(({ id, title }: TSubmodifier) => (
              <label key={`new-modifier-sub-${id}`}>
                <input
                  name="subModifierIds"
                  type="checkbox"
                  value={id}
                />{" "}
                {title}
              </label>
            ))}
          </fieldset>
        )}

        <Button type="submit">Add modifier</Button>
      </Form>
    </>
  );
};

export default Page;
