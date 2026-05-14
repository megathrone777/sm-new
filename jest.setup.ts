import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { fetch, Headers, Request, Response } from "undici";

Object.assign(globalThis, { fetch, Headers, Request, Response });

// jsdom doesn't implement requestSubmit; React 19 relies on it for formAction handlers
HTMLFormElement.prototype.requestSubmit = function (submitter?: HTMLElement | null) {
  const event = Object.assign(new Event("submit", { bubbles: true, cancelable: true }), {
    submitter: submitter ?? null,
  });
  this.dispatchEvent(event);
};
