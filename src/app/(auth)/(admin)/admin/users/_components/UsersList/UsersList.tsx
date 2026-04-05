import React from "react";
import Link from "next/link";

import { deleteUser, updateUser } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, ListLayout } from "@/app/(auth)/(admin)/_components";
import { authHelpers } from "@/helpers";
import { Button, Input } from "@/ui";

import { RoleSelect } from "../RoleSelect";

import { formClass, itemClass, linkClass, listClass } from "./UsersList.css";

const UsersList: React.FC = async () => {
  const users = await authHelpers.getUsers();

  return (
    <ListLayout
      deleteAction={deleteUser}
      href="/admin/users"
    >
      {!!users.length && (
        <div className={listClass}>
          {users.map(
            ({ id, login, role }: TUser): React.ReactElement => (
              <div
                className={itemClass}
                key={`user-item-${id}`}
              >
                <FormLayout
                  className={itemClass}
                  formAction={updateUser}
                  layoutClassName={formClass}
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
                </FormLayout>

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
    </ListLayout>
  );
};

export { UsersList };
