"use client";
import { useCallback, useEffect, useRef } from "react";

type TCallbackFn<TArgs extends unknown[]> = (...args: TArgs) => Promise<void> | void;

const useDebouncedCallback = <TArgs extends unknown[]>(
  callback: TCallbackFn<TArgs>,
  delay: number = 300,
): ((...args: TArgs) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<TCallbackFn<TArgs>>(callback);

  callbackRef.current = callback;

  const debouncedCallback = useCallback(
    (...args: TArgs): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout((): void => {
        void callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );

  useEffect((): VoidFunction => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

export { useDebouncedCallback };
