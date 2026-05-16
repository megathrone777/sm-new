import React from "react";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

import { setCartError } from "@/app/(web)/_actions";

import { Client } from "../Client";

jest.mock("@/app/(web)/_actions", () => ({
  setCartError: jest.fn(),
}));

jest.mock("@/hooks", () => ({
  useTranslation: (): { t: (key: string) => string } => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/ui", () => ({
  Input: ({
    defaultValue,
    isError,
    name,
    onBlur,
    placeholder,
  }: {
    defaultValue?: string;
    isError?: boolean;
    name?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    placeholder?: string;
  }): React.ReactElement => (
    <input
      data-error={isError}
      data-testid={`input-${name}`}
      defaultValue={defaultValue}
      name={name}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  ),
}));

jest.mock("../Phone", () => ({
  Phone: (): React.ReactElement => <div data-testid="phone-mock" />,
}));

jest.mock("../History", () => ({
  History: (): React.ReactElement => <div data-testid="history-mock" />,
}));

describe("Client", () => {
  const defaultProps = {
    email: "test@example.com",
    errors: {},
    name: "John Doe",
    phoneNumber: "123456789",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial values", () => {
    render(<Client {...defaultProps} />);
    expect(screen.getByTestId("input-name")).toHaveValue("John Doe");
    expect(screen.getByTestId("input-email")).toHaveValue("test@example.com");
  });

  it("renders the phone component", () => {
    render(<Client {...defaultProps} />);
    expect(screen.getByTestId("phone-mock")).toBeInTheDocument();
  });

  it("validates empty name on blur", () => {
    render(<Client {...defaultProps} />);
    const input = screen.getByTestId("input-name");

    fireEvent.change(input, { target: { value: "  " } });
    fireEvent.blur(input);

    expect(setCartError).toHaveBeenCalledWith("name", "Vyplňte jméno");
  });

  it("validates incorrect email format on blur", () => {
    render(<Client {...defaultProps} />);
    const input = screen.getByTestId("input-email");

    fireEvent.change(input, { target: { value: "not-an-email" } });
    fireEvent.blur(input);

    expect(setCartError).toHaveBeenCalledWith("email", "Neplatný e-mail");
  });

  it("fails email validation when email field is empty", () => {
    render(<Client {...defaultProps} />);
    const input = screen.getByTestId("input-email");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.blur(input);

    expect(setCartError).toHaveBeenCalledWith("email", "Vyplňte e-mail");
  });

  it("clears name error when input is valid", () => {
    render(<Client {...defaultProps} />);
    const input = screen.getByTestId("input-name");

    fireEvent.change(input, { target: { value: "Valid Name" } });
    fireEvent.blur(input);
    expect(setCartError).toHaveBeenCalledWith("name", "");
  });

  it("clears email error when a valid email is entered", () => {
    render(<Client {...defaultProps} />);
    const input = screen.getByTestId("input-email");

    fireEvent.change(input, { target: { value: "valid@example.com" } });
    fireEvent.blur(input);
    expect(setCartError).toHaveBeenCalledWith("email", "");
  });

  it("marks name input as error when errors.name is set", () => {
    render(
      <Client
        {...defaultProps}
        errors={{ name: "Vyplňte jméno" }}
      />,
    );
    expect(screen.getByTestId("input-name")).toHaveAttribute("data-error", "true");
  });

  it("marks email input as error when errors.email is set", () => {
    render(
      <Client
        {...defaultProps}
        errors={{ email: "Neplatný e-mail" }}
      />,
    );
    expect(screen.getByTestId("input-email")).toHaveAttribute("data-error", "true");
  });
});
