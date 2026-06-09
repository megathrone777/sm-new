"use client";
import React, { useActionState, useEffect, useRef } from "react";
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

import type { TProps } from "./Agent.types";

const Agent: React.FC<TProps> = ({ placeholder, showChips = true, title }) => {
  const [state, action, isPending] = useActionState(submitAgentForm, null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  useEffect((): void => {
    if (!state) return;
    if (window.innerWidth > 1024) return;
    wrapperRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [state]);

  return (
    <div
      className={wrapperClass}
      ref={wrapperRef}
    >
      <h2 className={titleClass}>{title}</h2>

      <Form
        {...{ action }}
        autoComplete="off"
        className={formClass}
        onSubmit={handleSubmit}
      >
        <div className={contentClass}>
          {state && <p className={messageClass}>{state.message}</p>}

          <textarea
            {...{ placeholder }}
            autoFocus={false}
            className={textareaClass}
            name="message"
            onKeyDown={handleKeyDown}
            spellCheck={false}
          />

          <Overlay {...{ isPending }} />
        </div>

        {showChips && <Chips />}
      </Form>
    </div>
  );
};

export { Agent };
