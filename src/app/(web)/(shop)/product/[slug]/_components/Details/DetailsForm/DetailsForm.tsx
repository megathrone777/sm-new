"use client";
import React, { useEffect, useState } from "react";
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
  const [totalPrice, setTotalPrice] = useState<number>(price);
  const [isSubmitting, toggleSubmitting] = useState<boolean>(false);
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

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    const selectedModifiers = collectSelectedModifiers(formData);

    toggleSubmitting(true);

    const { message, type } = await addToCart({
      ...product,
      modifiers: selectedModifiers,
      modifiersTitle,
      price,
      quantity: 1,
      totalPrice,
    });

    toggleSubmitting(false);

    if (type === "error") {
      toast(message, {
        type,
      });

      return;
    }

    if (type === "success") {
      toast(message, {
        type,
      });
      currentTarget.reset();

      return;
    }
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

  return (
    <form
      onChange={handleFormChange}
      onSubmit={handleSubmit}
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
          disabled={isSubmitting}
          type="submit"
        >
          {t<string>("addToCart")}
        </Button>

        {isSubmitting && <Spinner template="small" />}
      </div>
    </form>
  );
};

export { DetailsForm };
