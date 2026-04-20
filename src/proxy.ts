import { NextResponse, type NextRequest } from "next/server";

import { sessionsStore } from "@/store";

const COOKIE_NAME = "session";

const getSession = async ({ cookies }: NextRequest): Promise<null | TSessionData> => {
  const sessionId = cookies.get(COOKIE_NAME)?.value;

  if (!sessionId) return null;

  return sessionsStore.get(sessionId);
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
