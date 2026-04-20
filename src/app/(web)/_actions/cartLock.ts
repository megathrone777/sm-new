"use server";
import { cartStore } from "@/store";

const lock = (sessionId: string, retries = 10, delayMs = 100): Promise<boolean> =>
  cartStore.lock(sessionId, retries, delayMs);

const release = (sessionId: string): Promise<void> => cartStore.unlock(sessionId);

export { lock, release };
