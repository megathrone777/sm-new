import { type NextRequest, NextResponse } from "next/server";

import { store } from "@/store";
import { redis } from "@/store/redis";
import { pragueDay, toCourierStats } from "@/utils";

const dayPattern = /^\d{4}-\d{2}-\d{2}$/;

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
  const sessionId = request.cookies.get("session")?.value;
  const session = sessionId ? await store.sessions.getById(sessionId) : null;

  if (!session) return NextResponse.json({}, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({}, { status: 403 });

  const { id } = await params;
  const requested = request.nextUrl.searchParams.get("date");
  const date: string = requested && dayPattern.test(requested) ? requested : pragueDay();

  const [points, stats] = await Promise.all([
    redis.lrange<TTrackPoint>(`track:${date}:${id}`, 0, -1),
    redis.hgetall<Record<string, unknown>>(`stats:${date}:${id}`),
  ]);

  const track: TCourierTrack = {
    date,
    id,
    points,
    stats: toCourierStats(stats),
  };

  return NextResponse.json(track);
};
