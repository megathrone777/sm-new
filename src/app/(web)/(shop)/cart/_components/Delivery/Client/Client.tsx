import React from "react";

import { Input } from "@/ui";

import { Phone } from "./Phone";

import { wrapperClass } from "./Client.css";

import type { TProps } from "./Client.types";

const Client: React.FC<TProps> = ({ phoneNumber }) => {
  console.log(phoneNumber);
  // const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
  //   const { name, value } = currentTarget;

  //   dispatch(
  //     setDeliveryInfo({
  //       [name]: value,
  //     }),
  //   );
  // };

  // const handleInputErrorsReset = ({
  //   currentTarget,
  // }: React.SyntheticEvent<HTMLInputElement>): void => {
  //   const { name } = currentTarget;

  //   dispatch(
  //     setCartErrors({
  //       [name]: false,
  //     }),
  //   );
  // };

  return (
    <form
      action="#"
      className={wrapperClass}
    >
      <Input
        iconId="profile"
        name="name"
        // onChange={handleInputChange}
        // onFocus={handleInputErrorsReset}
        // placeholder={errors.name ? "Vyplňte jméno" : t<string>("name")}
        type="text"
      />

      <Input
        iconId="email"
        name="email"
        // onChange={handleInputChange}
        // onFocus={handleInputErrorsReset}
        // placeholder={errors.email ? "Vyplňte e-mail" : t<string>("email")}
        type="email"
      />

      <Phone {...{ phoneNumber }} />
    </form>
  );
};

export { Client };
