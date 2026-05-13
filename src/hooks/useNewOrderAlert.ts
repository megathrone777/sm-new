"use client";
import { useCallback, useEffect, useRef } from "react";

type TWebkitWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

const TONE_HZ = 880;
const TONE_COUNT = 3;
const TONE_DURATION = 0.25;
const TONE_GAP = 0.3;

const useNewOrderAlert = (): { notify: (id: number) => void; test: () => void } => {
  const ctxRef = useRef<AudioContext | null>(null);

  const playBeep = useCallback((): void => {
    const ctx = ctxRef.current;

    if (!ctx || ctx.state !== "running") return;

    for (let i = 0; i < TONE_COUNT; i++) {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.type = "sine";
      oscillator.frequency.value = TONE_HZ;

      const start = ctx.currentTime + i * TONE_GAP;

      gain.gain.setValueAtTime(0.3, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + TONE_DURATION);
      oscillator.start(start);
      oscillator.stop(start + TONE_DURATION);
    }
  }, []);

  const notify = useCallback(
    (id: number): void => {
      if (typeof window === "undefined") return;

      if ("Notification" in window && Notification.permission === "granted") {
        const notification = new Notification(`Новый заказ №${id}`, {
          body: "Новый заказ",
          requireInteraction: false,
          tag: `order-${id}`,
        });

        notification.onclick = (): void => {
          window.focus();
          notification.close();
        };
      }

      playBeep();
    },
    [playBeep],
  );

  useEffect((): undefined | VoidFunction => {
    if (typeof window === "undefined") return;

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    const unlock = (): void => {
      if (!ctxRef.current) {
        const Ctor = window.AudioContext ?? (window as TWebkitWindow).webkitAudioContext;

        if (!Ctor) return;
        ctxRef.current = new Ctor();
      }

      if (ctxRef.current.state === "suspended") {
        ctxRef.current.resume();
      }
    };

    document.addEventListener("click", unlock, { once: true });
    document.addEventListener("keydown", unlock, { once: true });

    return (): void => {
      document.removeEventListener("click", unlock);
      document.removeEventListener("keydown", unlock);
    };
  }, []);

  return { notify, test: playBeep };
};

export { useNewOrderAlert };
