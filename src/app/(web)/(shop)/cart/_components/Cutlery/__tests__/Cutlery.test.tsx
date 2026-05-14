// ─── LESSON 5: Testing a React component ─────────────────────────────────────
//
// render(<Component />)         — mounts the component in a fake browser DOM
// screen.getByText('...')       — find element by its visible text
// screen.getByTestId('...')     — find element by data-testid attribute
// screen.queryByTestId('...')   — like getBy but returns null (not throws) if missing
// userEvent.click(element)      — simulates a real user click (async, handles React updates)
// expect(el).toBeInTheDocument() — from jest-dom: checks the element exists in the DOM
// expect(el).toBeDisabled()     — from jest-dom: checks the button/input is disabled
//
// We mock the UI library (@/ui) and server actions to keep this test focused
// solely on the Cutlery component's own logic — not on the Button or CSS.
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// ─── Mock server action ───────────────────────────────────────────────────────

vi.mock("@/app/(web)/_actions", () => ({
  updateCutleryQuantity: vi.fn().mockResolvedValue(undefined),
}));

// ─── Mock Next.js router (Cutlery cleans up the URL hash on scroll) ───────────

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({ replace: vi.fn() })),
}));

// ─── Mock @/ui with simple HTML elements ─────────────────────────────────────
//
// We replace the styled QuantityButton and Icon with plain buttons/spans.
// This means:
//   - We don't pull in any CSS/vanilla-extract code from the UI library
//   - We control what data-testid each element has
//   - Tests are fast and focused on Cutlery's own logic

vi.mock("@/ui", () => ({
  Icon: ({ id }: { id: string }): React.ReactElement => <span data-testid={`icon-${id}`} />,
  QuantityButton: ({
    decrease,
    disabled,
    onClick,
    value,
  }: {
    decrease?: boolean;
    disabled?: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    value: string;
  }): React.ReactElement => (
    <button
      {...{ disabled, onClick, value }}
      data-testid={decrease ? "btn-decrease" : "btn-increase"}
      type="button"
    />
  ),
}));

// ─── Mock the vanilla-extract CSS file ───────────────────────────────────────
//
// Cutlery.tsx imports class names from ./Cutlery.css (a .css.ts file).
// We replace them with empty strings — we're testing behaviour, not styling.
// layoutClass is an object with 'default' and 'error' keys (a CSS variant).

vi.mock("../Cutlery.css", () => ({
  errorIconClass: "",
  layoutClass: { default: "", error: "" },
  nameClass: "",
  priceClass: "",
  quantityAmountClass: "",
  quantityClass: "",
  wrapperClass: "",
}));

import { updateCutleryQuantity } from "@/app/(web)/_actions";

import { Cutlery } from "../Cutlery";

// ─────────────────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Cutlery", () => {
  describe("display", () => {
    it("shows the current quantity", () => {
      render(
        <Cutlery
          isError={false}
          quantity={3}
          totalPrice={0}
        />,
      );

      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("shows the price when totalPrice is greater than 0", () => {
      render(
        <Cutlery
          isError={false}
          quantity={2}
          totalPrice={30}
        />,
      );

      expect(screen.getByText(/30/)).toBeInTheDocument();
    });

    it("hides the price when totalPrice is 0", () => {
      render(
        <Cutlery
          isError={false}
          quantity={2}
          totalPrice={0}
        />,
      );

      // The component renders nothing for price when totalPrice === 0
      expect(screen.queryByText(/Kč/)).not.toBeInTheDocument();
    });

    it("shows the error icon when isError is true", () => {
      render(
        <Cutlery
          isError
          quantity={0}
          totalPrice={0}
        />,
      );

      expect(screen.getByTestId("icon-exclamation")).toBeInTheDocument();
    });

    it("hides the error icon when isError is false", () => {
      render(
        <Cutlery
          isError={false}
          quantity={1}
          totalPrice={0}
        />,
      );

      expect(screen.queryByTestId("icon-exclamation")).not.toBeInTheDocument();
    });
  });

  describe("decrease button", () => {
    it("is disabled when quantity is 0", () => {
      render(
        <Cutlery
          isError={false}
          quantity={0}
          totalPrice={0}
        />,
      );

      expect(screen.getByTestId("btn-decrease")).toBeDisabled();
    });

    it("is enabled when quantity is above 0", () => {
      render(
        <Cutlery
          isError={false}
          quantity={2}
          totalPrice={0}
        />,
      );

      expect(screen.getByTestId("btn-decrease")).toBeEnabled();
    });
  });

  describe("user interactions", () => {
    it("calls updateCutleryQuantity with 'increase' when increase button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <Cutlery
          isError={false}
          quantity={1}
          totalPrice={0}
        />,
      );

      await user.click(screen.getByTestId("btn-increase"));

      expect(updateCutleryQuantity).toHaveBeenCalledWith("increase");
    });

    it("calls updateCutleryQuantity with 'decrease' when decrease button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <Cutlery
          isError={false}
          quantity={2}
          totalPrice={0}
        />,
      );

      await user.click(screen.getByTestId("btn-decrease"));

      expect(updateCutleryQuantity).toHaveBeenCalledWith("decrease");
    });

    it("re-renders with the new quantity when the prop updates (simulates server confirming)", () => {
      // Note: testing the optimistic state directly is not possible in jsdom because
      // React flushes the transition synchronously in tests, reverting the optimistic
      // value before any assertion runs.
      // What we CAN test: when the parent re-renders with the new quantity (after the
      // server response), the correct value is displayed.
      const { rerender } = render(
        <Cutlery
          isError={false}
          quantity={1}
          totalPrice={0}
        />,
      );

      rerender(
        <Cutlery
          isError={false}
          quantity={2}
          totalPrice={0}
        />,
      );

      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });
});
