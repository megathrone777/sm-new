import { cookies } from "next/headers";

import { redis } from "@/lib";

const COOKIE_NAME = "session";

const getSession = async (): Promise<null | TSessionData> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;

  if (!sessionId) return null;
  const data = await redis.get<TSessionData>(`session:${sessionId}`);

  if (!data) return null;

  return typeof data === "string" ? JSON.parse(data) : data;
};

export { getSession };
