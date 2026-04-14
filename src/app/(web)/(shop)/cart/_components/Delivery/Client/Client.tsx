import React from "react";

import { Input } from "@/ui";

import { History } from "./History";
import { Phone } from "./Phone";

import { phoneWrapperClass, wrapperClass } from "./Client.css";

import type { TProps } from "./Client.types";

const Client: React.FC<TProps> = ({ phoneNumber }) => (
  <div className={wrapperClass}>
    <Input
      iconId="profile"
      name="name"
      type="text"
    />

    <Input
      iconId="email"
      name="email"
      type="email"
    />

    <div className={phoneWrapperClass}>
      <Phone {...{ phoneNumber }} />
      <History {...{ phoneNumber }} />
    </div>
  </div>
);

export { Client };
