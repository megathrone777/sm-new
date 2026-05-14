import React from "react";
import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

const DeliveryOptions: React.FC<
  Pick<TDelivery, "address" | "type"> & {
    onUpdate: (data: { address: string; type: string }) => void;
  }
> = ({ address, onUpdate, type }): React.ReactElement => (
  <div>
    {type === "delivery" && onUpdate && (
      <input
        data-testid="delivery-input"
        defaultValue={address}
        onChange={(e) => onUpdate({ address: e.target.value, type })}
        placeholder="Zadejte adresu"
      />
    )}
  </div>
);

describe("DeliveryOptions", () => {
  it("shows the address input with placeholder when 'delivery' is selected", () => {
    render(
      <DeliveryOptions
        address=""
        onUpdate={jest.fn()}
        type="delivery"
      />,
    );

    expect(screen.getByPlaceholderText("Zadejte adresu")).toBeInTheDocument();
  });

  it("hides the address input when 'pickup' is selected", () => {
    render(
      <DeliveryOptions
        address=""
        onUpdate={jest.fn()}
        type="pickup"
      />,
    );

    expect(screen.queryByPlaceholderText("Zadejte adresu")).not.toBeInTheDocument();
  });

  it("calls onUpdate when the address is changed", () => {
    const onUpdate = jest.fn();

    render(
      <DeliveryOptions
        address=""
        onUpdate={onUpdate}
        type="delivery"
      />,
    );

    fireEvent.change(screen.getByTestId("delivery-input"), { target: { value: "Main St 123" } });
    expect(onUpdate).toHaveBeenCalled();
  });
});
