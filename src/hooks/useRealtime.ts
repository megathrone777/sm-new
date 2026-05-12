"use client";
import { createRealtime } from "@upstash/realtime/client";

import type { RealtimeEvents } from "@/store";

const { useRealtime } = createRealtime<RealtimeEvents>();

export { useRealtime };
