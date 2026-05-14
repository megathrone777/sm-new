import React from "react";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.mock("@/hooks", () => ({
  useTranslation: (): { t: (key: string) => string } => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/ui", () => ({
  Checkbox: ({
    defaultChecked,
    hint,
    label,
    name,
    type,
    value,
  }: {
    defaultChecked?: boolean;
    hint?: string;
    label: string;
    name: string;
    type: string;
    value: string;
  }): React.ReactElement => (
    <label>
      <input
        data-testid={`radio-${value}`}
        defaultChecked={defaultChecked}
        name={name}
        type={type}
        value={value}
      />
      {label}
      {hint && <span data-testid={`hint-${value}`}>{hint}</span>}
    </label>
  ),
}));

jest.mock("../Delivery.css", () => ({
  labelClass: "",
  wrapperClass: "",
}));

import { Delivery } from "../Delivery";

describe("Delivery", () => {
  describe("radio button state", () => {
    it("marks 'delivery' radio as checked when type is 'delivery'", () => {
      render(
        <Delivery
          totalPrice={300}
          type="delivery"
        />,
      );
      expect(screen.getByTestId("radio-delivery")).toBeChecked();
    });

    it("marks 'pickup' radio as checked when type is 'pickup'", () => {
      render(
        <Delivery
          totalPrice={300}
          type="pickup"
        />,
      );
      expect(screen.getByTestId("radio-pickup")).toBeChecked();
    });

    it("does not check 'delivery' radio when type is 'pickup'", () => {
      render(
        <Delivery
          totalPrice={300}
          type="pickup"
        />,
      );
      expect(screen.getByTestId("radio-delivery")).not.toBeChecked();
    });
  });

  describe("pickup discount hint", () => {
    it("shows a discount hint when totalPrice is above 500", () => {
      render(
        <Delivery
          totalPrice={501}
          type="delivery"
        />,
      );
      expect(screen.getByTestId("hint-pickup")).toBeInTheDocument();
    });

    it("hides the discount hint when totalPrice is exactly 500", () => {
      render(
        <Delivery
          totalPrice={500}
          type="delivery"
        />,
      );
      expect(screen.queryByTestId("hint-pickup")).not.toBeInTheDocument();
    });

    it("hides the discount hint when totalPrice is below 500", () => {
      render(
        <Delivery
          totalPrice={200}
          type="delivery"
        />,
      );
      expect(screen.queryByTestId("hint-pickup")).not.toBeInTheDocument();
    });
  });

  describe("radio button names", () => {
    it("both radios share the same name for mutual exclusion", () => {
      render(
        <Delivery
          totalPrice={300}
          type="delivery"
        />,
      );
      expect(screen.getByTestId("radio-delivery")).toHaveAttribute("name", "deliveryType");
      expect(screen.getByTestId("radio-pickup")).toHaveAttribute("name", "deliveryType");
    });
  });
});
