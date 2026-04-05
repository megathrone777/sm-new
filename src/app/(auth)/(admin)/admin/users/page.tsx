import React from "react";
import Form from "next/form";
import Link from "next/link";

import { createUser, deleteUser, updateUser } from "@/app/(auth)/(admin)/_actions";
import { Header } from "@/app/(auth)/(admin)/_components";
import { DeleteAlert } from "@/app/(auth)/_components";
import { authHelpers } from "@/helpers";
import { Button, Input } from "@/ui";

import { RoleSelect } from "./_components";

import { createFormClass, formClass, itemClass, linkClass, listClass } from "./page.css";

const Page: React.FC<PageProps<"/admin/users">> = async ({ searchParams }) => {
  const params = await searchParams;
  const deleteId = Array.isArray(params.deleteId)
    ? (params.deleteId[0] ?? null)
    : (params.deleteId ?? null);
  const deleteTitle = Array.isArray(params.deleteTitle)
    ? (params.deleteTitle[0] ?? null)
    : (params.deleteTitle ?? null);
  const users = await authHelpers.getUsers();

  return (
    <>
      <Header title="Users" />

      {deleteId && (
        <DeleteAlert
          action={deleteUser}
          deleteId={deleteId}
          deleteTitle={deleteTitle}
          href="/admin/users"
        />
      )}

      <Form
        action={createUser}
        className={createFormClass}
      >
        <Input
          label="Name / E-mail"
          name="login"
          placeholder="New user login"
          type="text"
        />

        <Input
          label="Password"
          name="password"
          placeholder="New user password"
          type="text"
        />

        <RoleSelect
          defaultValue="cook"
          options={[
            {
              label: "Admin",
              value: "admin",
            },
            {
              label: "Cook",
              value: "cook",
            },
          ]}
        />

        <Button
          template="small"
          type="submit"
        >
          Create user
        </Button>
      </Form>

      {!!users.length && (
        <div className={listClass}>
          {users.map(
            ({ id, login, role }: TUser): React.ReactElement => (
              <div
                className={itemClass}
                key={`user-${id}`}
              >
                <Form
                  action={updateUser}
                  className={formClass}
                >
                  <input
                    name="currentLogin"
                    type="hidden"
                    value={login}
                  />

                  <Input
                    defaultValue={login}
                    label="Login / E-mail"
                    name="login"
                    type="text"
                  />

                  <Input
                    label="New password"
                    name="password"
                    placeholder="Leave blank to keep current"
                    type="text"
                  />

                  <RoleSelect
                    defaultValue={role}
                    options={[
                      {
                        label: "Admin",
                        value: "admin",
                      },
                      {
                        label: "Cook",
                        value: "cook",
                      },
                    ]}
                  />

                  <Button
                    template="small"
                    type="submit"
                  >
                    Save
                  </Button>
                </Form>

                {role !== "admin" ? (
                  <Link
                    className={linkClass}
                    href={`/admin/users?deleteId=${login}&deleteTitle=${encodeURIComponent(login)}`}
                    scroll={false}
                  >
                    <Button
                      iconId="trash"
                      template="small"
                    />
                  </Link>
                ) : (
                  <div style={{ minWidth: 38 }} />
                )}
              </div>
            ),
          )}
        </div>
      )}
    </>
  );
};

export default Page;
