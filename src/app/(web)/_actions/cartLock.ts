"use server";
import { redis } from "@/lib";

const lock = async (sessionId: string, retries = 10, delayMs = 100): Promise<boolean> => {
  const lockKey = `lock:cart:${sessionId}`;

  for (let i = 0; i < retries; i++) {
    const result = await redis.set(lockKey, "1", { ex: 5, nx: true });

    if (result === "OK") return true;

    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  return false;
};

const release = async (sessionId: string): Promise<void> => {
  await redis.del(`lock:cart:${sessionId}`);
};

export { lock, release };
