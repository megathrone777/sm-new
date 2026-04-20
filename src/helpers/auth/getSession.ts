import { cookies } from "next/headers";

import { sessionsStore } from "@/store";

const COOKIE_NAME = "session";

const getSession = async (): Promise<null | TSessionData> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;

  if (!sessionId) return null;

  return sessionsStore.get(sessionId);
};

export { getSession };
