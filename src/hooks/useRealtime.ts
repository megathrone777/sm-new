"use client";
import { createRealtime } from "@upstash/realtime/client";

import type { RealtimeEvents } from "@/store";

type TUseRealtime = ReturnType<typeof createRealtime<RealtimeEvents>>["useRealtime"];

let _realtime: ReturnType<typeof createRealtime<RealtimeEvents>> | undefined;

const getRealtime = (): ReturnType<typeof createRealtime<RealtimeEvents>> =>
  (_realtime ??= createRealtime<RealtimeEvents>());

const useRealtime: TUseRealtime = (...args) => getRealtime().useRealtime(...args);

export { useRealtime };
