import React from "react";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/app/(web)/_actions", () => ({
  updateCutleryQuantity: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ replace: jest.fn() })),
}));

jest.mock("@/ui", () => ({
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

jest.mock("@/hooks", () => ({
  useTranslation: (): { t: (key: string) => string } => ({ t: (key: string) => key }),
}));

jest.mock("../Cutlery.css", () => ({
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

beforeEach(() => {
  jest.clearAllMocks();
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
