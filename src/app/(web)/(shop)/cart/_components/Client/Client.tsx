import React from "react";

import { Input } from "@/ui";

import { History } from "./History";
import { Phone } from "./Phone";

import { inputsClass, layoutClass, wrapperClass } from "./Client.css";

import type { TProps } from "./Client.types";

const Client: React.FC<TProps> = ({ email, errors, name, phoneNumber }) => (
  <div className={wrapperClass}>
    <div className={inputsClass}>
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
    </div>

    <div className={layoutClass}>
      <Phone
        {...{ phoneNumber }}
        isError={Boolean(errors.phone)}
      />

      <History {...{ phoneNumber }} />
    </div>
  </div>
);

export { Client };
