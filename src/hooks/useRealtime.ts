"use client";
import { createRealtime } from "@upstash/realtime/client";

import type { RealtimeEvents } from "@/store/realtime";

const { useRealtime } = createRealtime<RealtimeEvents>();

export { useRealtime };
