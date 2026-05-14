// ─── LESSON 6: Testing conditional rendering and disabled state ───────────────
//
// The Promo component is a great example of "logic inside rendering":
//   - The fieldset becomes disabled based on 4 conditions
//   - The "Apply" button becomes a checkmark icon once a promo is applied
//   - A reset button appears only when a code has been entered
//
// We can test all of this without running the real server actions.
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/(web)/_actions", () => ({
  applyPromocode: vi.fn(),
  resetPromocode: vi.fn(),
}));

vi.mock("@/ui", () => ({
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

vi.mock("../Promo.css", () => ({
  buttonClass: "",
  layoutClass: "",
  loadingWrapperClass: "",
  resetButtonClass: "",
  submitClass: "",
  successIconClass: "",
}));

import { Promo } from "../Promo";
// ─── Default props for a fully enabled, empty promo field ─────────────────────

const defaultProps = {
  addressError: undefined,
  delivery: { address: "Karlova 15", type: "delivery" as TDeliveryType } as TDelivery,
  phoneError: undefined,
  phoneNumber: "420737123456",
  promo: { code: "", discount: 0 },
  promoError: undefined,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Promo", () => {
  describe("disabled state", () => {
    it("is enabled when phone and delivery address are both provided", () => {
      render(<Promo {...defaultProps} />);

      // The fieldset wraps all promo inputs; disabled on it means everything inside is disabled
      const fieldset = document.querySelector("fieldset");

      expect(fieldset).not.toBeDisabled();
    });

    it("is disabled when phone number is empty", () => {
      render(
        <Promo
          {...defaultProps}
          phoneNumber=""
        />,
      );

      expect(document.querySelector("fieldset")).toBeDisabled();
    });

    it("is disabled when there is a phone validation error", () => {
      render(
        <Promo
          {...defaultProps}
          phoneError="Neplatné telefonní číslo"
        />,
      );

      expect(document.querySelector("fieldset")).toBeDisabled();
    });

    it("is disabled when delivery is selected but address is empty", () => {
      render(
        <Promo
          {...defaultProps}
          delivery={
            {
              address: "",
              type: "delivery" as TDeliveryType,
            } as TDelivery
          }
        />,
      );

      expect(document.querySelector("fieldset")).toBeDisabled();
    });

    it("is disabled when there is an address validation error", () => {
      render(
        <Promo
          {...defaultProps}
          addressError="Adresa mimo dosah"
        />,
      );

      expect(document.querySelector("fieldset")).toBeDisabled();
    });

    it("is enabled for pickup delivery even without an address", () => {
      // For pickup, address is irrelevant — the fieldset should be enabled
      render(
        <Promo
          {...defaultProps}
          delivery={
            {
              address: "",
              type: "pickup" as TDeliveryType,
            } as TDelivery
          }
        />,
      );

      expect(document.querySelector("fieldset")).not.toBeDisabled();
    });
  });

  describe("promo state", () => {
    it("shows the Apply button when no promo code is applied", () => {
      render(<Promo {...defaultProps} />);

      // "Použit" is the Czech translation for "Use" (promoUse key in cs.json)
      expect(screen.getByRole("button", { name: /použit/i })).toBeInTheDocument();
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

      // The cross icon is inside a button; there should be one for resetting
      expect(screen.getByTestId("icon-cross")).toBeInTheDocument();
    });

    it("hides the reset button when no code is entered", () => {
      render(
        <Promo
          {...defaultProps}
          promo={{ code: "", discount: 0 }}
        />,
      );

      expect(screen.queryByTestId("icon-cross")).not.toBeInTheDocument();
    });

    it("shows the promo error message when promoError is provided", () => {
      render(
        <Promo
          {...defaultProps}
          promoError="Promo kód není aktivní"
        />,
      );

      expect(screen.getByText("Promo kód není aktivní")).toBeInTheDocument();
    });

    it("does not show an error paragraph when promoError is not provided", () => {
      render(<Promo {...defaultProps} />);

      expect(screen.queryByText(/promo kód/i)).not.toBeInTheDocument();
    });
  });
});
