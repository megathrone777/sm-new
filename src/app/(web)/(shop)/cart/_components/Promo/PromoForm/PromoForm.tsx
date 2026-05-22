"use client";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

import { applyPromocode, clearPromoError } from "@/app/(web)/_actions";

const PromoForm: React.FC = () => {
  const [state, action] = useActionState(applyPromocode, null);

  useEffect((): void => {
    if (!state) return;
    const { message, type } = state;

    toast(message, {
      onClose: type === "error" ? clearPromoError : undefined,
      type,
    });
  }, [state]);

  return (
    <form
      {...{ action }}
      hidden
      id="promo-form"
    />
  );
};

export { PromoForm };
