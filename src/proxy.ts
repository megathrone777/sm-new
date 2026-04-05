import { NextResponse, type NextRequest } from "next/server";

import { redis } from "@/lib/redis";

const COOKIE_NAME = "session";

const getSession = async ({ cookies }: NextRequest): Promise<null | TSessionData> => {
  const sessionId = cookies.get(COOKIE_NAME)?.value;

  if (!sessionId) return null;
  const session = await redis.get<TSessionData>(`session:${sessionId}`);

  if (!session) return null;

  return typeof session === "string" ? JSON.parse(session) : session;
};

export const proxy = async (request: NextRequest): Promise<NextResponse> => {
  const { pathname } = request.nextUrl;
  const session = await getSession(request);

  if (pathname === "/login") {
    if (session) {
      const dest = session.role === "admin" ? "/admin" : "/orders";

      return NextResponse.redirect(new URL(dest, request.url));
    }

    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && session.role === "cook") {
    return NextResponse.redirect(new URL("/orders", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/login", "/admin/:path*", "/orders/:path*"],
};
