import { describe, expect, it, jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";

import { useDebouncedCallback } from "../useDebouncedCallback";

type TCallbackFn<TArgs extends unknown[]> = (...args: TArgs) => Promise<void> | void;

describe("useDebouncedCallback", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("calls the callback after the specified delay", () => {
    const callback = jest.fn() as unknown as TCallbackFn<[string, string]>;

    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    act(() => {
      result.current("arg1", "arg2");
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("arg1", "arg2");
  });

  it("debounces multiple rapid calls", () => {
    const callback = jest.fn() as unknown as TCallbackFn<[string]>;

    const { result } = renderHook(() => useDebouncedCallback(callback, 300));

    act(() => {
      result.current("first");
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    act(() => {
      result.current("second");
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    act(() => {
      result.current("third");
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("third");
  });

  it("uses the latest callback reference for each call", () => {
    const callback1 = jest.fn() as unknown as TCallbackFn<[string]>;
    const { rerender, result } = renderHook(
      ({ cb }: { cb: TCallbackFn<[string]> }) => useDebouncedCallback(cb, 100),
      { initialProps: { cb: callback1 } },
    );

    act(() => {
      result.current("from-cb1");
    });

    const callback2 = jest.fn() as unknown as TCallbackFn<[string]>;

    rerender({ cb: callback2 });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith("from-cb1");
  });

  it("calls with default 300ms delay when none specified", () => {
    const callback = jest.fn() as unknown as TCallbackFn<[string]>;

    const { result } = renderHook(() => useDebouncedCallback(callback));

    act(() => {
      result.current("default-delay");
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cleans up the timeout on unmount", () => {
    const callback = jest.fn() as unknown as TCallbackFn<[string]>;

    const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 100));

    act(() => {
      result.current("will-be-cancelled");
    });

    act(() => {
      unmount();
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
