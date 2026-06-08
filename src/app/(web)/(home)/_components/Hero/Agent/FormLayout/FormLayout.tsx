"use client";
import React, { useState } from "react";

import { sendMessage } from "../actions";

import { dotClass, dotsClass, layoutClass, responseClass, textareaClass } from "./FormLayout.css";

import type { TProps } from "./FormLayout.types";

const FormLayout: React.FC<TProps> = ({ children }) => {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleSend = async (text: string): Promise<void> => {
    setResponse("");
    setIsLoading(true);

    try {
      const result = await sendMessage(text);

      setResponse(result);
    } finally {
      setIsLoading(false);
      setValue("");
    }
  };

  const handleChange = ({ currentTarget }: React.SyntheticEvent<HTMLTextAreaElement>): void => {
    setValue(currentTarget.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if ((event.key === "Enter" || event.key === "NumpadEnter") && !event.shiftKey) {
      event.preventDefault();
      const text = event.currentTarget.value.trim();

      if (!text) return;
      void handleSend(text);
    }
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    void handleSend(value);
  };

  return (
    <form
      action="#"
      onSubmit={handleSubmit}
    >
      {response && <p className={responseClass}>{response}</p>}

      <textarea
        {...{ value }}
        className={textareaClass}
        name="prompt"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Napište, na co máte chuť — poradíme a přidáme rovnou do košíku..."
        spellCheck={false}
      />

      <div className={layoutClass}>
        {isLoading ? (
          <div className={dotsClass}>
            <i className={dotClass} />

            <i
              className={dotClass}
              style={{
                animationDelay: ".2s",
              }}
            />

            <i
              className={dotClass}
              style={{
                animationDelay: ".4s",
              }}
            />
          </div>
        ) : (
          children
        )}
      </div>
    </form>
  );
};

export { FormLayout };
