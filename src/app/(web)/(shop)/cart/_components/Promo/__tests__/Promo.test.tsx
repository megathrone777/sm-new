import React from "react";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.mock("@/app/(web)/_actions", () => ({
  applyPromocode: jest.fn(),
  resetPromocode: jest.fn(),
}));

jest.mock("@/ui", () => ({
  Icon: ({ id }: { id: string }): React.ReactElement => <span data-testid={`icon-${id}`} />,
  Input: ({
    defaultValue,
    isError,
    name,
    placeholder,
  }: {
    defaultValue?: string;
    isError?: boolean;
    name: string;
    placeholder?: string;
  }): React.ReactElement => (
    <input
      {...{ defaultValue, name, placeholder }}
      data-error={`${isError}`}
      data-testid="promo-input"
    />
  ),
}));

jest.mock("@/hooks", () => ({
  useTranslation: (): { t: (key: string) => string } => ({ t: (key: string) => key }),
}));

jest.mock("../Promo.css", () => ({
  buttonClass: "",
  layoutClass: "",
  loadingWrapperClass: "",
  resetButtonClass: "",
  submitClass: "",
  successLayoutClass: "",
}));

import { Promo } from "../Promo";

const defaultProps = {
  addressError: undefined,
  delivery: { address: "Karlova 15", type: "delivery" } as TDelivery,
  phoneError: undefined,
  phoneNumber: "420737123456",
  promo: { code: "", discount: 0 },
  promoError: undefined,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Promo", () => {
  describe("disabled state", () => {
    it("is enabled when phone and delivery address are both provided", () => {
      render(<Promo {...defaultProps} />);

      const fieldset = document.querySelector("fieldset") as HTMLFieldSetElement;

      expect(fieldset).not.toBeDisabled();
    });

    it("is disabled when phone number is empty", () => {
      render(
        <Promo
          {...defaultProps}
          phoneNumber=""
        />,
      );

      expect(document.querySelector("fieldset") as HTMLFieldSetElement).toBeDisabled();
    });

    it("is disabled when there is a phone validation error", () => {
      render(
        <Promo
          {...defaultProps}
          phoneError="Neplatné telefonní číslo"
        />,
      );

      expect(document.querySelector("fieldset") as HTMLFieldSetElement).toBeDisabled();
    });

    it("is disabled when delivery is selected but address is empty", () => {
      render(
        <Promo
          {...defaultProps}
          delivery={
            {
              address: "",
              type: "delivery",
            } as TDelivery
          }
        />,
      );

      expect(document.querySelector("fieldset") as HTMLFieldSetElement).toBeDisabled();
    });

    it("is disabled when there is an address validation error", () => {
      render(
        <Promo
          {...defaultProps}
          addressError="Adresa mimo dosah"
        />,
      );

      expect(document.querySelector("fieldset") as HTMLFieldSetElement).toBeDisabled();
    });

    it("is enabled for pickup delivery even without an address", () => {
      render(
        <Promo
          {...defaultProps}
          delivery={
            {
              address: "",
              type: "pickup",
            } as TDelivery
          }
        />,
      );

      expect(document.querySelector("fieldset") as HTMLFieldSetElement).not.toBeDisabled();
    });
  });

  describe("promo state", () => {
    it("shows the Apply button when no promo code is applied", () => {
      render(<Promo {...defaultProps} />);
      expect(screen.getByRole("button", { name: /promoUse/i })).toBeInTheDocument();
    });

    it("shows a success checkmark icon instead of the Apply button when promo is applied", () => {
      render(
        <Promo
          {...defaultProps}
          promo={{ code: "SUMMER20", discount: 50 }}
        />,
      );
      expect(screen.queryByRole("button", { name: /použít/i })).not.toBeInTheDocument();
      expect(screen.getByTestId("icon-checkmark")).toBeInTheDocument();
    });

    it("shows the reset (cross) button when a code has been entered", () => {
      render(
        <Promo
          {...defaultProps}
          promo={{ code: "SUMMER20", discount: 0 }}
        />,
      );
      expect(screen.getByTestId("icon-close")).toBeInTheDocument();
    });

    it("hides the reset button when no code is entered", () => {
      render(
        <Promo
          {...defaultProps}
          promo={{ code: "", discount: 0 }}
        />,
      );
      expect(screen.queryByTestId("icon-close")).not.toBeInTheDocument();
    });

    it("apply button is type submit (wired to applyPromocode via formAction)", () => {
      render(<Promo {...defaultProps} />);
      expect(screen.getByRole("button", { name: /promoUse/i })).toHaveAttribute("type", "submit");
    });

    it("reset button is type submit (wired to resetPromocode via formAction)", () => {
      render(
        <Promo
          {...defaultProps}
          promo={{ code: "SAVE10", discount: 0 }}
        />,
      );
      expect(screen.getByTestId("icon-close").closest("button")).toHaveAttribute("type", "submit");
    });
  });
});
