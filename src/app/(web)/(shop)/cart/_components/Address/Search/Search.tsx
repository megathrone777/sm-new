import React, { useEffect, useState } from "react";

import {
  getAddressSuggestions,
  resetDeliveryAddress,
  reverseGeocodeAddress,
  selectDeliveryAddress,
} from "@/app/(web)/_actions";
import { useDebouncedCallback, useTranslation } from "@/hooks";
import { Button, Icon, Input, Spinner } from "@/ui";

import {
  distanceClass,
  deliveryCurrencyClass,
  deliveryErrorClass,
  deliveryPriceClass,
  layoutClass,
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
  const [isLocating, setIsLocating] = useState<boolean>(false);

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

  const handleUseMyLocation = (): void => {
    if (!navigator.geolocation || isLocating) return;

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }): Promise<void> => {
        const result = await reverseGeocodeAddress(coords.latitude, coords.longitude);

        if (result) {
          await handleAddressSelect(result);
        }

        setIsLocating(false);
      },
      (): void => {
        setIsLocating(false);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
    );
  };

  useEffect((): void => {
    setInputValue(delivery.address);
  }, [delivery.address]);

  return (
    <div className={wrapperClass}>
      <div className={layoutClass}>
        <Input
          enterKeyHint="done"
          iconId="address"
          isError={Boolean(addressError)}
          name="address"
          onChange={handleInputChange}
          placeholder={t<string>("fillAddress")}
          restrictCyrillic
          type="text"
          value={inputValue}
        />

        <Button
          disabled={isLocating}
          iconId={isLocating ? null : "locate"}
          onClick={handleUseMyLocation}
          template="small"
          title={t<string>("useMyLocation")}
          type="button"
        >
          {isLocating && (
            <Spinner
              color="white"
              template="small"
            />
          )}
        </Button>
      </div>

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

      {delivery.address.length > 0 && inputValue.length > 0 && (
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
