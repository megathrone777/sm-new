"use client";
import React, { useEffect, useState } from "react";

import { useDebouncedCallback } from "@/hooks";
import { Input, Spinner } from "@/ui";

import { resultsClass, wrapperClass, spinnerClass } from "./Search.css";

import type { TProps } from "./Search.types";

const Search = <T,>({ children, searchAction }: TProps<T>): React.ReactElement => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const [results, setResults] = useState<null | T[]>(null);

  const getResults = useDebouncedCallback(async (query: string): Promise<void> => {
    const searchResults = await searchAction(query);

    setResults(searchResults);
    toggleLoading(false);
  }, 200);

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    const { value } = currentTarget;

    setInputValue(value);

    if (value.length > 0) {
      toggleLoading(true);
    } else {
      setResults(null);
    }
  };

  const handleInputReset = (): void => {
    setInputValue("");
    setResults(null);
    toggleLoading(false);
  };

  useEffect((): void => {
    if (inputValue.length > 0) {
      getResults(inputValue);
    }
  }, [inputValue]);

  return (
    <div className={wrapperClass}>
      <Input
        onChange={handleInputChange}
        onReset={handleInputReset}
        placeholder="Search..."
        type={isLoading ? "text" : "search"}
        value={inputValue}
      />

      {isLoading && (
        <div className={spinnerClass}>
          <Spinner template="small" />
        </div>
      )}

      {results && <div className={resultsClass}>{children(results)}</div>}
    </div>
  );
};

export { Search };
