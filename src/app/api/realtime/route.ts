import { handle } from "@upstash/realtime";

import { realtime } from "@/store/realtime";

export const GET = handle({ realtime });
