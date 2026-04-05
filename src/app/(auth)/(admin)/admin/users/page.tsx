import React from "react";
import Form from "next/form";

import { createUser, deleteUser, updateUser } from "@/app/(auth)/(admin)/_actions";
import { Header } from "@/app/(auth)/(admin)/_components";
import { authHelpers } from "@/helpers";
import { Button, Input } from "@/ui";

import { RoleSelect } from "./_components";

import { createFormClass, formClass, itemClass, listClass } from "./page.css";

const Page: React.FC = async () => {
  const users = await authHelpers.getUsers();

  return (
    <>
      <Header title="Users" />

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
                  <Form action={deleteUser}>
                    <input
                      name="login"
                      type="hidden"
                      value={login}
                    />

                    <Button
                      template="small"
                      type="submit"
                    >
                      Delete
                    </Button>
                  </Form>
                ) : (
                  <div style={{ minWidth: 65 }} />
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
