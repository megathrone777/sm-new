import React, { useEffect, useState } from "react";

import {
  getAddressSuggestions,
  resetDeliveryAddress,
  selectDeliveryAddress,
} from "@/app/(web)/_actions";
import { useDebouncedCallback, useTranslation } from "@/hooks";
import { Icon, Input } from "@/ui";

import {
  distanceClass,
  deliveryCurrencyClass,
  deliveryErrorClass,
  deliveryPriceClass,
  resetButtonClass,
  resultsClass,
  suggestionsClass,
  suggestionsItemClass,
  wrapperClass,
} from "./Search.css";

import type { TProps } from "./Search.types";

const Search: React.FC<TProps> = ({ addressError, delivery }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<string>(delivery.address);
  const [suggestions, setSuggestions] = useState<TAddressSuggestion[]>([]);

  const fetchSuggestions = useDebouncedCallback(async (query: string): Promise<void> => {
    const results = await getAddressSuggestions(query);

    setSuggestions(results);
  }, 400);

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    const { value } = currentTarget;

    setInputValue(value);

    if (!value.trim()) {
      setSuggestions([]);

      return;
    }

    fetchSuggestions(value);
  };

  const handleAddressSelect = async ({
    name,
    position: { lat, lon },
  }: TAddressSuggestion): Promise<void> => {
    setInputValue(name);
    setSuggestions([]);
    await selectDeliveryAddress(name, {
      lat,
      lng: lon,
    });
  };

  const handleInputReset = async (): Promise<void> => {
    setInputValue("");
    setSuggestions([]);
    await resetDeliveryAddress();
  };

  useEffect((): void => {
    setInputValue(delivery.address);
  }, [delivery.address]);

  return (
    <div className={wrapperClass}>
      <Input
        iconId="address"
        isError={Boolean(addressError)}
        name="address"
        onChange={handleInputChange}
        placeholder={t<string>("fillAddress")}
        type="text"
        value={inputValue}
      />

      {suggestions.length > 0 && (
        <div className={suggestionsClass}>
          <ul>
            {suggestions.map<React.ReactElement>(({ location, name, position }) => (
              <li
                className={suggestionsItemClass}
                key={`${name}-${location}`}
                onClick={(): void => {
                  handleAddressSelect({ location, name, position });
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {delivery.address.length > 0 && (
        <button
          className={resetButtonClass}
          onClick={handleInputReset}
          type="button"
        >
          <Icon id="close" />
        </button>
      )}

      {delivery.distanceInM > 0 && (
        <p className={distanceClass}>
          {delivery.distanceInM > 1000
            ? `${(delivery.distanceInM / 1000).toFixed(1)}km`
            : `${delivery.distanceInM}m`}
        </p>
      )}

      <div className={resultsClass}>
        {addressError ? (
          <p className={deliveryErrorClass}>{addressError}</p>
        ) : (
          delivery.price !== null && (
            <p className={deliveryPriceClass}>
              <span>Cena dopravy: {delivery.price} </span>
              <span className={deliveryCurrencyClass}>{t<string>("currency")}</span>
            </p>
          )
        )}
      </div>
    </div>
  );
};

export { Search };
