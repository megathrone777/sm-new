import React from "react";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/app/(web)/_actions", () => ({
  updateQuantity: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
}));

jest.mock("@/ui", () => ({
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

jest.mock("@/hooks", () => ({
  useTranslation: (): { t: (key: string) => string } => ({ t: (key: string) => key }),
}));

jest.mock("../QuantityControls.css", () => ({
  optionsClass: "",
  priceClass: "",
  quantityAmountClass: "",
  quantityClass: "",
  removeButtonClass: "",
}));

import { updateQuantity } from "@/app/(web)/_actions";

import { QuantityControls } from "../QuantityControls";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("QuantityControls", () => {
  describe("display", () => {
    it("shows the current quantity", () => {
      render(
        <QuantityControls
          index={0}
          onRemove={jest.fn()}
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
          onRemove={jest.fn()}
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
          onRemove={jest.fn()}
          quantity={1}
          totalPrice={280}
        />,
      );

      expect(screen.getByText(/currency/)).toBeInTheDocument();
    });
  });

  describe("decrease button", () => {
    it("is disabled when quantity is 1 — you cannot go below 1", () => {
      render(
        <QuantityControls
          index={0}
          onRemove={jest.fn()}
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
          onRemove={jest.fn()}
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
          onRemove={jest.fn()}
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
          onRemove={jest.fn()}
          quantity={3}
          totalPrice={840}
        />,
      );

      await user.click(screen.getByTestId("btn-decrease"));
      expect(updateQuantity).toHaveBeenCalledWith(0, "decrease");
    });

    it("re-renders with the updated quantity when the server confirms", () => {
      const { rerender } = render(
        <QuantityControls
          index={0}
          onRemove={jest.fn()}
          quantity={1}
          totalPrice={280}
        />,
      );

      rerender(
        <QuantityControls
          index={0}
          onRemove={jest.fn()}
          quantity={2}
          totalPrice={560}
        />,
      );

      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("calls the onRemove callback when the Remove button is clicked", async () => {
      const user = userEvent.setup();
      const onRemove = jest.fn();

      render(
        <QuantityControls
          index={0}
          onRemove={onRemove}
          quantity={1}
          totalPrice={280}
        />,
      );

      await user.click(screen.getByRole("button", { name: /remove/i }));
      expect(onRemove).toHaveBeenCalled();
    });
  });
});
