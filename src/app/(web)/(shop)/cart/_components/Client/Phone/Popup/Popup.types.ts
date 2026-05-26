import type { CountryCode } from "use-telephone";

export interface TOption {
  label: string;
  value: CountryCode;
}

export interface TProps {
  countryCode: CountryCode;
  onCountryChange: (newCountry: CountryCode) => void;
}
