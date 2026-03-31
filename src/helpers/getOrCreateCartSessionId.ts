import { randomUUID } from "node:crypto";

import { cookies } from "next/headers";

const COOKIE_MAX_AGE: number = 60 * 60 * 24 * 7;
const COOKIE_NAME: string = "sid";

// const getCartSessionId = async (): Promise<null | string> => {
//   const cookieStore = await cookies();
//   const existingSessionId = cookieStore.get(COOKIE_NAME)?.value;

//   return existingSessionId ? `cart:${existingSessionId}` : null;
// };

const getOrCreateCartSessionId = async (): Promise<string> => {
  const cookieStore = await cookies();
  const existingSessionId = cookieStore.get(COOKIE_NAME)?.value;

  if (existingSessionId) return `cart:${existingSessionId}`;
  const sessionId: string = randomUUID();

  cookieStore.set({
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    name: COOKIE_NAME,
    path: "/",
    sameSite: "lax",
    secure: true,
    value: sessionId,
  });

  return `cart:${sessionId}`;
};

export { getOrCreateCartSessionId };
