"use client";
import React, { useActionState } from "react";
import Form from "next/form";

import { submitAgentForm } from "@/app/(web)/_actions";

import { Chips } from "./Chips";
import { Overlay } from "./Overlay";

import {
  contentClass,
  formClass,
  messageClass,
  textareaClass,
  titleClass,
  wrapperClass,
} from "./Agent.css";

const Agent: React.FC = () => {
  const [state, action, isPending] = useActionState(submitAgentForm, null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if ((event.key === "Enter" || event.key === "NumpadEnter") && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  const handleSubmit = async ({
    currentTarget,
  }: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    await Promise.resolve();
    void currentTarget.reset();
  };

  return (
    <div className={wrapperClass}>
      <h2 className={titleClass}>Na co máte chut'?</h2>

      <Form
        {...{ action }}
        autoComplete="off"
        className={formClass}
        onSubmit={handleSubmit}
      >
        <div className={contentClass}>
          {state && <p className={messageClass}>{state.message}</p>}

          <textarea
            className={textareaClass}
            name="message"
            onKeyDown={handleKeyDown}
            placeholder="Napište, na co máte chuť — poradíme a přidáme rovnou do košíku..."
            spellCheck={false}
          />

          <Overlay {...{ isPending }} />
        </div>

        <Chips />
      </Form>
    </div>
  );
};

export { Agent };
