import { type NextRequest, NextResponse } from "next/server";

import { redis } from "@/store/redis";
import { geoDistance, pragueDay } from "@/utils";

const ex: number = 60 * 60 * 12;
const historyEx: number = 60 * 60 * 24 * 30;

const minMove: number = 10;
const maxMove: number = 2000;
const maxSpeed: number = 200;

const pointDistance: number = 25;
const pointInterval: number = 60000;
const maxPoints: number = 5000;

const toKmh = (speed: null | number): null | number =>
  speed === null ? null : Math.round(speed * 3.6);

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  if (request.headers.get("x-api-secret") !== process.env.COURIER_API_SECRET) {
    return NextResponse.json({}, { status: 401 });
  }

  const courierData = (await request.json()) as TCourier;
  const { id, latitude, longitude, speed } = courierData;

  if (!id) return NextResponse.json({}, { status: 400 });

  const at: number = Date.now();
  const day: string = pragueDay();

  const courierKey: string = `courier:${id}`;
  const statsKey: string = `stats:${day}:${id}`;
  const trackKey: string = `track:${day}:${id}`;

  const speedKmh = toKmh(speed);

  const [previous, currentMax] = await redis
    .pipeline()
    .get<TCourierRecord>(courierKey)
    .hget<number>(statsKey, "maxSpeed")
    .exec<[TCourierRecord, null | number]>();

  const last =
    previous?.updatedAt && pragueDay(new Date(previous.updatedAt)) === day ? previous : null;
  const moved = last ? geoDistance(last, { latitude, longitude }) : null;
  const sincePoint = last?.pointAt ? at - last.pointAt : Infinity;

  const append: boolean = moved === null || moved >= pointDistance || sincePoint >= pointInterval;

  const pipeline = redis.pipeline();

  pipeline.set<TCourierRecord>(
    courierKey,
    {
      ...courierData,
      pointAt: append ? at : (last?.pointAt ?? at),
      speed: speedKmh,
      updatedAt: at,
    },
    { ex }
  );

  if (moved !== null && moved >= minMove && moved <= maxMove) {
    pipeline.hincrby(statsKey, "distance", Math.round(moved));
  }

  if (speedKmh !== null && speedKmh <= maxSpeed && speedKmh > (currentMax ?? 0)) {
    pipeline.hset(statsKey, { maxSpeed: speedKmh });
  }

  if (append) {
    pipeline.rpush<TTrackPoint>(trackKey, { at, latitude, longitude, speed: speedKmh });
    pipeline.ltrim(trackKey, -maxPoints, -1);
    pipeline.expire(trackKey, historyEx);
    pipeline.hincrby(statsKey, "points", 1);
  }

  pipeline.hsetnx(statsKey, "firstAt", at);
  pipeline.hset(statsKey, { lastAt: at });
  pipeline.expire(statsKey, historyEx);

  await pipeline.exec();

  return NextResponse.json({});
};
