"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { redis } from "@/lib";

const COOKIE_NAME = "session";

const logout = async (): Promise<void> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;

  if (sessionId) {
    await redis.del(`session:${sessionId}`);
  }

  cookieStore.delete(COOKIE_NAME);
  redirect("/login", "replace");
};

export { logout };
