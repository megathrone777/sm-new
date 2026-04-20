"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { sessionsStore } from "@/store";

const COOKIE_NAME = "session";

const logout = async (): Promise<void> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;

  if (sessionId) {
    await sessionsStore.delete(sessionId);
  }

  cookieStore.delete(COOKIE_NAME);
  redirect("/");
};

export { logout };
