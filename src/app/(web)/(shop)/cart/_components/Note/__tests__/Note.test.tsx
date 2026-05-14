import React from "react";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.mock("@/ui", () => ({
  Icon: ({ id }: { id: string }): React.ReactElement => <span data-testid={`icon-${id}`} />,
}));

jest.mock("../Note.css", () => ({
  iconClass: "",
  textareaClass: "",
  wrapperClass: "",
}));

import { Note } from "../Note";

describe("Note", () => {
  it("renders a textarea with the correct placeholder", () => {
    render(<Note />);
    expect(screen.getByPlaceholderText(/vynechat sezam/i)).toBeInTheDocument();
  });

  it("sets the provided defaultValue in the textarea", () => {
    render(<Note defaultValue="Extra sauce please" />);
    expect(screen.getByRole("textbox")).toHaveValue("Extra sauce please");
  });

  it("renders an empty textarea when no defaultValue is given", () => {
    render(<Note />);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("limits input to 250 characters", () => {
    render(<Note />);
    expect(screen.getByRole("textbox")).toHaveAttribute("maxLength", "250");
  });

  it("uses name='note' for form submission", () => {
    render(<Note />);
    expect(screen.getByRole("textbox")).toHaveAttribute("name", "note");
  });

  it("shows the note icon", () => {
    render(<Note />);
    expect(screen.getByTestId("icon-note")).toBeInTheDocument();
  });
});
