import React from "react";

import { createUser } from "@/app/(auth)/(admin)/_actions";
import { FormLayout } from "@/app/(auth)/(admin)/_components";
import { Input } from "@/ui";

import { RoleSelect } from "../RoleSelect";

import { wrapperClass } from "./CreateUser.css";

const CreateUser: React.FC = () => (
  <FormLayout
    className={wrapperClass}
    formAction={createUser}
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
  </FormLayout>
);

export { CreateUser };
