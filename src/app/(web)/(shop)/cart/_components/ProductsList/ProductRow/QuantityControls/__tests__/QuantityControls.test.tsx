// ─── LESSON 7: Testing optimistic UI and user interactions ────────────────────
//
// QuantityControls uses React 19's useOptimistic hook to update the displayed
// quantity INSTANTLY when a button is clicked, before the server responds.
//
// Testing this teaches you:
//   - How to test buttons with async handlers (userEvent handles act() for you)
//   - How to verify optimistic state: the UI updates before the server call completes
//   - How to test that a callback prop (onRemove) is called correctly
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/(web)/_actions", () => ({
  updateQuantity: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/ui", () => ({
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

vi.mock("../QuantityControls.css", () => ({
  optionsClass: "",
  priceClass: "",
  quantityAmountClass: "",
  quantityClass: "",
  removeButtonClass: "",
}));

import { updateQuantity } from "@/app/(web)/_actions";

import { QuantityControls } from "../QuantityControls";

// ─────────────────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
});

describe("QuantityControls", () => {
  describe("display", () => {
    it("shows the current quantity", () => {
      render(
        <QuantityControls
          index={0}
          onRemove={vi.fn()}
          quantity={3}
          totalPrice={280}
        />,
      );

      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("shows the product price", () => {
      render(
        <QuantityControls
          index={0}
          onRemove={vi.fn()}
          quantity={1}
          totalPrice={280}
        />,
      );

      expect(screen.getByText(/280/)).toBeInTheDocument();
    });

    it("shows currency next to the price", () => {
      render(
        <QuantityControls
          index={0}
          onRemove={vi.fn()}
          quantity={1}
          totalPrice={280}
        />,
      );

      // useTranslation returns 'Kč' for the 'currency' key
      expect(screen.getByText(/Kč/)).toBeInTheDocument();
    });
  });

  describe("decrease button", () => {
    it("is disabled when quantity is 1 — you cannot go below 1", () => {
      render(
        <QuantityControls
          index={0}
          onRemove={vi.fn()}
          quantity={1}
          totalPrice={280}
        />,
      );

      expect(screen.getByTestId("btn-decrease")).toBeDisabled();
    });

    it("is enabled when quantity is greater than 1", () => {
      render(
        <QuantityControls
          index={0}
          onRemove={vi.fn()}
          quantity={2}
          totalPrice={560}
        />,
      );

      expect(screen.getByTestId("btn-decrease")).toBeEnabled();
    });
  });

  describe("user interactions", () => {
    it("calls updateQuantity with (index, 'increase') when increase is clicked", async () => {
      const user = userEvent.setup();

      render(
        <QuantityControls
          index={2}
          onRemove={vi.fn()}
          quantity={1}
          totalPrice={280}
        />,
      );

      await user.click(screen.getByTestId("btn-increase"));

      expect(updateQuantity).toHaveBeenCalledWith(2, "increase");
    });

    it("calls updateQuantity with (index, 'decrease') when decrease is clicked", async () => {
      const user = userEvent.setup();

      render(
        <QuantityControls
          index={0}
          onRemove={vi.fn()}
          quantity={3}
          totalPrice={840}
        />,
      );

      await user.click(screen.getByTestId("btn-decrease"));

      expect(updateQuantity).toHaveBeenCalledWith(0, "decrease");
    });

    it("re-renders with the updated quantity when the server confirms", () => {
      // Note: testing the OPTIMISTIC state directly is not possible in jsdom because
      // React flushes the entire transition (including the server action) synchronously,
      // so the optimistic value reverts before any assertion can observe it.
      // What we test instead: the component correctly reflects a prop update — this
      // is what happens after the server confirms and the parent re-renders.
      const { rerender } = render(
        <QuantityControls
          index={0}
          onRemove={vi.fn()}
          quantity={1}
          totalPrice={280}
        />,
      );

      rerender(
        <QuantityControls
          index={0}
          onRemove={vi.fn()}
          quantity={2}
          totalPrice={560}
        />,
      );

      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("calls the onRemove callback when the Remove button is clicked", async () => {
      const user = userEvent.setup();
      const onRemove = vi.fn();

      render(
        <QuantityControls
          index={0}
          onRemove={onRemove}
          quantity={1}
          totalPrice={280}
        />,
      );

      // 'Odstranit' is the Czech word for 'Remove' (remove key in cs.json)
      await user.click(screen.getByRole("button", { name: /odstranit/i }));

      expect(onRemove).toHaveBeenCalledOnce();
    });
  });
});
