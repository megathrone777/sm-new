import React from "react";
import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, renderHook, screen } from "@testing-library/react";

import { useClickOutside } from "../useClickOutside";

describe("useClickOutside", () => {
  it("calls the callback when clicking outside the element", () => {
    const callback = jest.fn();
    const ref = React.createRef<HTMLDivElement>();

    render(
      <div>
        <div
          data-testid="inside"
          ref={ref}
        >
          Inside
        </div>
        <div data-testid="outside">Outside</div>
      </div>
    );

    renderHook(() => useClickOutside(ref, callback));
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not call callback when clicking inside the element", () => {
    const callback = jest.fn();
    const ref = React.createRef<HTMLDivElement>();

    render(
      <div
        data-testid="inside"
        ref={ref}
      >
        Inside
      </div>
    );

    renderHook(() => useClickOutside(ref, callback));
    fireEvent.mouseDown(screen.getByTestId("inside"));
    expect(callback).not.toHaveBeenCalled();
  });

  it("does not call callback when ref is null", () => {
    const callback = jest.fn();
    const ref = React.createRef<HTMLDivElement>();

    renderHook(() => useClickOutside(ref, callback));
    fireEvent.mouseDown(document.body);
    expect(callback).not.toHaveBeenCalled();
  });

  it("cleans up the event listener on unmount", () => {
    const callback = jest.fn();
    const ref = React.createRef<HTMLDivElement>();
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() => useClickOutside(ref, callback));

    expect(addEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
