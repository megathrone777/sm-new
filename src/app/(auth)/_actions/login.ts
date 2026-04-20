"use server";
import crypto from "crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { authHelpers } from "@/helpers/auth";
import { sessionsStore } from "@/store";
import { verifyPassword } from "@/utils";

const COOKIE_NAME = "session";
const SESSION_TTL = 60 * 60 * 24 * 30;

const createSession = async (data: TSessionData): Promise<void> => {
  const sessionId = crypto.randomBytes(32).toString("hex");

  await sessionsStore.set(sessionId, data, SESSION_TTL);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, sessionId, {
    httpOnly: true,
    maxAge: SESSION_TTL,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

const login = async (formData: FormData): Promise<void> => {
  const loginValue = formData.get("login");
  const password = formData.get("password");

  if (typeof loginValue !== "string" || typeof password !== "string") return;
  const user = await authHelpers.getUser(loginValue);

  if (!user || !verifyPassword(password, user.passwordHash, user.salt)) return;
  await createSession({ role: user.role, userId: user.id });

  if (user.role === "admin") {
    redirect("/admin", "replace");
  } else {
    redirect("/orders", "replace");
  }
};

export { login };
