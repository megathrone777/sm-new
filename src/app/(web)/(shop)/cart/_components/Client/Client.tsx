import React from "react";

import { Input } from "@/ui";

import { FormLayout } from "./FormLayout";
import { History } from "./History";
import { Phone } from "./Phone";

import { layoutClass, wrapperClass } from "./Client.css";

import type { TProps } from "./Client.types";

const Client: React.FC<TProps> = ({ errors, phoneNumber }) => (
  <div className={wrapperClass}>
    <FormLayout>
      <div className={layoutClass}>
        <Input
          iconId="profile"
          isError={Boolean(errors.name)}
          name="name"
          type="text"
        />

        <Input
          iconId="email"
          isError={Boolean(errors.email)}
          name="email"
          type="email"
        />

        <Phone {...{ phoneNumber }} />
        <History {...{ phoneNumber }} />
      </div>
    </FormLayout>
  </div>
);

export { Client };
