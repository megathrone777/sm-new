"use client";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import Form from "next/form";

import { Icon } from "@/ui";

import { Chips } from "./Chips";
import { formAction } from "./formAction";

import {
  buttonClass,
  contentClass,
  dotClass,
  dotsClass,
  formClass,
  layoutClass,
  modelClass,
  modelIconClass,
  responseClass,
  textareaClass,
  titleClass,
  wrapperClass,
} from "./Agent.css";

const Agent: React.FC = () => {
  const [response, action, isPending] = useActionState(formAction, null);

  useEffect(() => {
    if (response) toast(response.message, { type: response.type });
  }, [response]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if ((event.key === "Enter" || event.key === "NumpadEnter") && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div className={wrapperClass}>
      <h2 className={titleClass}>Na co máte chut'?</h2>

      <Form
        {...{ action }}
        autoComplete="off"
        className={formClass}
      >
        <div className={contentClass}>
          {response && <p className={responseClass}>{response.message}</p>}

          <textarea
            className={textareaClass}
            name="message"
            onKeyDown={handleKeyDown}
            placeholder="Napište, na co máte chuť — poradíme a přidáme rovnou do košíku..."
            spellCheck={false}
          />

          <div className={layoutClass}>
            {isPending ? (
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
              <>
                <p className={modelClass}>
                  <span className={modelIconClass} />
                  <span>SushiMan AI</span>
                </p>

                <button
                  className={buttonClass}
                  type="submit"
                >
                  <Icon id="arrow" />
                </button>
              </>
            )}
          </div>
        </div>

        <Chips />
      </Form>
    </div>
  );
};

export { Agent };
