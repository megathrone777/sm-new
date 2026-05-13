import React from "react";

import { useTranslation } from "@/hooks";
import { Input } from "@/ui";

// import { History } from "./History";
import { Phone } from "./Phone";

import { inputsClass, wrapperClass } from "./Client.css";

import type { TProps } from "./Client.types";

const Client: React.FC<TProps> = ({ email, errors, name, phoneNumber }) => {
  const { t } = useTranslation();

  return (
    <div className={wrapperClass}>
      <div className={inputsClass}>
        <Input
          defaultValue={name}
          iconId="profile"
          isError={Boolean(errors.name)}
          name="name"
          placeholder={errors.name ? "Vyplňte jméno" : t<string>("name")}
          type="text"
        />

        <Input
          defaultValue={email}
          iconId="email"
          isError={Boolean(errors.email)}
          name="email"
          placeholder={errors.email ? "Vyplňte e-mail" : t<string>("email")}
          type="email"
        />
      </div>

      <Phone
        {...{ phoneNumber }}
        isError={Boolean(errors.phone)}
      />

      {/* <History {...{ phoneNumber }} /> */}
    </div>
  );
};

export { Client };
