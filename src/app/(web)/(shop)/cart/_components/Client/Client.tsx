import React from "react";

import { Input } from "@/ui";

import { FormLayout } from "./FormLayout";
import { History } from "./History";
import { Phone } from "./Phone";

import { layoutClass, wrapperClass } from "./Client.css";

import type { TProps } from "./Client.types";

const Client: React.FC<TProps> = ({ email, errors, name, phoneNumber }) => (
  <div className={wrapperClass}>
    <FormLayout {...{ errors }}>
      <Input
        defaultValue={name}
        iconId="profile"
        isError={Boolean(errors.name)}
        name="name"
        type="text"
      />

      <Input
        defaultValue={email}
        iconId="email"
        isError={Boolean(errors.email)}
        name="email"
        type="email"
      />
    </FormLayout>

    <div className={layoutClass}>
      <Phone
        isError={Boolean(errors.phone)}
        {...{ phoneNumber }}
      />

      <History {...{ phoneNumber }} />
    </div>
  </div>
);

export { Client };
