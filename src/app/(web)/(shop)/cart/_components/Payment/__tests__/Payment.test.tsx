import React from "react";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.mock("@/hooks", () => ({
  useTranslation: (): { t: (key: string) => string } => ({ t: (key: string) => key }),
}));

jest.mock("@/ui", () => ({
  Checkbox: ({
    defaultChecked,
    disabled,
    label,
    name,
    type,
    value,
  }: {
    defaultChecked?: boolean;
    disabled?: boolean;
    label: React.ReactNode;
    name?: string;
    type?: string;
    value?: unknown;
  }): React.ReactElement => (
    <label>
      <input
        data-testid={name && value != null ? `${name}-${value}` : `checkbox-${name}`}
        defaultChecked={defaultChecked}
        disabled={disabled}
        name={name}
        type={type ?? "checkbox"}
        value={`${value ?? ""}`}
      />
      <span>{label}</span>
    </label>
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }): React.ReactElement => <a href={href}>{children}</a>,
}));

jest.mock("../Submit", () => ({
  Submit: (): React.ReactElement => <div data-testid="payment-submit" />,
}));

jest.mock("../Tips", () => ({
  Tips: (): React.ReactElement => <div data-testid="tips" />,
}));

jest.mock("./Payment.css", () => ({
  agreeClass: "",
  agreeLabelClass: "",
  agreeLinkClass: "",
  changeClass: "",
  labelHolderClass: "",
  labelImageClass: "",
  layoutClass: "",
  rowClass: "",
}));

import { Payment } from "../Payment";

const cashPayment: TCart["payment"] = { change: null, type: "cash" };
const cardPayment: TCart["payment"] = { change: null, type: "card" };
const defaultTips: TCart["tips"] = { percentage: 0, price: 0 };

describe("Payment", () => {
  describe("payment type selection", () => {
    it("checks the card radio when payment type is 'card'", () => {
      render(
        <Payment
          deliveryType="delivery"
          payment={cardPayment}
          tips={defaultTips}
          totalPrice={300}
        />,
      );

      expect(screen.getByTestId("payment-card")).toBeChecked();
    });

    it("checks the cash radio when payment type is 'cash'", () => {
      render(
        <Payment
          deliveryType="delivery"
          payment={cashPayment}
          tips={defaultTips}
          totalPrice={300}
        />,
      );

      expect(screen.getByTestId("payment-cash")).toBeChecked();
    });

    it("does not check the card radio when payment type is 'cash'", () => {
      render(
        <Payment
          deliveryType="delivery"
          payment={cashPayment}
          tips={defaultTips}
          totalPrice={300}
        />,
      );

      expect(screen.getByTestId("payment-card")).not.toBeChecked();
    });
  });

  describe("pickup-only option", () => {
    it("shows the cardAfterDelivery radio for pickup orders", () => {
      render(
        <Payment
          deliveryType="pickup"
          payment={cardPayment}
          tips={defaultTips}
          totalPrice={300}
        />,
      );

      expect(screen.getByTestId("payment-cardAfterDelivery")).toBeInTheDocument();
    });

    it("hides the cardAfterDelivery radio for delivery orders", () => {
      render(
        <Payment
          deliveryType="delivery"
          payment={cardPayment}
          tips={defaultTips}
          totalPrice={300}
        />,
      );

      expect(screen.queryByTestId("payment-cardAfterDelivery")).not.toBeInTheDocument();
    });
  });

  describe("cash change options", () => {
    it("shows change options (2000 / 5000) when payment type is cash", () => {
      render(
        <Payment
          deliveryType="delivery"
          payment={cashPayment}
          tips={defaultTips}
          totalPrice={300}
        />,
      );

      expect(screen.getByTestId("change-2000")).toBeInTheDocument();
      expect(screen.getByTestId("change-5000")).toBeInTheDocument();
    });

    it("hides change options when payment type is card", () => {
      render(
        <Payment
          deliveryType="delivery"
          payment={cardPayment}
          tips={defaultTips}
          totalPrice={300}
        />,
      );

      expect(screen.queryByTestId("change-2000")).not.toBeInTheDocument();
      expect(screen.queryByTestId("change-5000")).not.toBeInTheDocument();
    });

    it("checks the 2000 option when change is 2000", () => {
      render(
        <Payment
          deliveryType="delivery"
          payment={{ change: 2000, type: "cash" }}
          tips={defaultTips}
          totalPrice={300}
        />,
      );

      expect(screen.getByTestId("change-2000")).toBeChecked();
      expect(screen.getByTestId("change-5000")).not.toBeChecked();
    });

    it("checks the 5000 option when change is 5000", () => {
      render(
        <Payment
          deliveryType="delivery"
          payment={{ change: 5000, type: "cash" }}
          tips={defaultTips}
          totalPrice={300}
        />,
      );

      expect(screen.getByTestId("change-5000")).toBeChecked();
      expect(screen.getByTestId("change-2000")).not.toBeChecked();
    });
  });

  describe("agree section", () => {
    it("renders a link to the terms of service", () => {
      render(
        <Payment
          deliveryType="delivery"
          payment={cashPayment}
          tips={defaultTips}
          totalPrice={300}
        />,
      );

      expect(screen.getByRole("link", { name: /obchodními podmínkami/i })).toBeInTheDocument();
    });
  });
});
