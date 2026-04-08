"use client";
import React, { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { addToCart, calculateProductPrice } from "@/app/(web)/_actions";
import { useTranslation } from "@/hooks";
import { Button, Spinner } from "@/ui";
import { toKey } from "@/utils";

import { footerClass, totalPriceClass, totalPriceValueClass } from "./DetailsForm.css";

import type { TProps } from "./DetailsForm.types";

const DetailsForm: React.FC<TProps> = ({
  children,
  modifiers,
  modifiersTitle,
  price,
  ...product
}) => {
  const [state, action, pending] = useActionState(addToCart, null);
  const [totalPrice, setTotalPrice] = useState<number>(price);
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname() as __next_route_internal_types__.RouteImpl<string>;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const collectSelectedModifiers = (formData: FormData): TCartModifier[] => {
    const modifierIds = formData.getAll("modifier");

    const selectedModifiers: TCartModifier[] = modifierIds.map((modifierId): TCartModifier => {
      const modifier = modifiers.find(({ id }: TModifier): boolean => id === Number(modifierId))!;
      const subModifierId = formData.get(`${modifierId}-submodifier`);
      const subModifier = subModifierId
        ? modifier.subModifiers?.find(
            ({ id }: TSubmodifier): boolean => id === Number(subModifierId),
          )
        : undefined;

      return {
        ...modifier,
        ...(subModifier && { subModifier: { id: subModifier.id, title: subModifier.title } }),
      };
    });

    return selectedModifiers;
  };

  const removeRequiredParam = (): void => {
    if (!searchParams.get("requiredModifier")) return;
    const params = new URLSearchParams(`${searchParams}`);

    params.delete("requiredModifier");

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleFormChange = async ({
    currentTarget,
  }: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    const formData = new FormData(currentTarget);
    const selectedModifiers = collectSelectedModifiers(formData);
    const newTotalPrice = await calculateProductPrice(price, selectedModifiers);

    setTotalPrice(newTotalPrice);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedModifiers = collectSelectedModifiers(formData);

    startTransition((): void => {
      action({
        ...product,
        addedFromList: false,
        modifiers: selectedModifiers,
        modifiersTitle,
        price,
        quantity: 1,
        totalPrice,
      });
    });
  };

  useEffect((): void => {
    if (searchParams.get("requiredModifier")) {
      toast(modifiersTitle, {
        onClose: removeRequiredParam,
        toastId: toKey(`requiredModifier-toast-${modifiersTitle}`),
        type: "error",
      });
    }
  }, [searchParams]);

  useEffect((): void => {
    if (!state) return;
    const { message, type } = state;

    toast(message, { type });

    if (type === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      onChange={handleFormChange}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <input
        name="totalPrice"
        type="hidden"
        value={totalPrice}
      />

      {children}

      <p className={totalPriceClass}>
        <span className={totalPriceValueClass}>{t<string>("priceTotal")}:</span>
        {totalPrice} Kč
      </p>

      <div className={footerClass}>
        <Button
          disabled={pending}
          type="submit"
        >
          {pending ? (
            <Spinner
              color="white"
              template="small"
            />
          ) : (
            t<string>("addToCart")
          )}
        </Button>
      </div>
    </form>
  );
};

export { DetailsForm };
