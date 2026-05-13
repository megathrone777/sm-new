"use client";
import React, { useState } from "react";

import { setCartError } from "@/app/(web)/_actions";
import { useTranslation } from "@/hooks";
import { Input } from "@/ui";

// import { History } from "./History";
import { Phone } from "./Phone";

import { inputsClass, wrapperClass } from "./Client.css";

import type { TProps } from "./Client.types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateName = (value: string): string | undefined => {
  if (!value.trim()) return "Vyplňte jméno";

  return undefined;
};

const validateEmail = (value: string): string | undefined => {
  const trimmed = value.trim();

  if (!trimmed) return "Vyplňte e-mail";
  if (!EMAIL_REGEX.test(trimmed)) return "Neplatný e-mail";

  return undefined;
};

const Client: React.FC<TProps> = ({ email, errors, name, phoneNumber }) => {
  const { t } = useTranslation();
  const [localErrors, setLocalErrors] = useState<{
    email?: string;
    name?: string;
  }>({});

  const handleNameBlur = ({ currentTarget }: React.FocusEvent<HTMLInputElement>): void => {
    const message = validateName(currentTarget.value);

    setLocalErrors(
      (prev: { email?: string; name?: string }): { email?: string; name?: string } => ({
        ...prev,
        name: message,
      }),
    );
    setCartError("name", message ?? "");
  };

  const handleEmailBlur = ({ currentTarget }: React.FocusEvent<HTMLInputElement>): void => {
    const message = validateEmail(currentTarget.value);

    setLocalErrors(
      (prev: { email?: string; name?: string }): { email?: string; name?: string } => ({
        ...prev,
        email: message,
      }),
    );
    setCartError("email", message ?? "");
  };

  const nameError = errors.name ?? localErrors.name;
  const emailError = errors.email ?? localErrors.email;

  return (
    <div className={wrapperClass}>
      <div className={inputsClass}>
        <Input
          defaultValue={name}
          enterKeyHint="done"
          iconId="profile"
          isError={Boolean(nameError)}
          name="name"
          onBlur={handleNameBlur}
          placeholder={nameError ?? t<string>("name")}
          restrictCyrillic
          type="text"
        />

        <Input
          defaultValue={email}
          enterKeyHint="done"
          iconId="email"
          isError={Boolean(emailError)}
          name="email"
          onBlur={handleEmailBlur}
          placeholder={emailError ?? t<string>("email")}
          restrictCyrillic
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
