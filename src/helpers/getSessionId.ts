"use server";
import { cookies } from "next/headers";

const COOKIE_NAME: string = "sid";

const getSessionId = async (): Promise<null | string> => {
  const cookieStore = await cookies();
  const existingSessionId = cookieStore.get(COOKIE_NAME)?.value;

  if (existingSessionId) return `cart:${existingSessionId}`;

  return null;
};

export { getSessionId };
