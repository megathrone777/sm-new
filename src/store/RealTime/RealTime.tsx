"use client";
import React from "react";
import { RealtimeProvider } from "@upstash/realtime/client";

const RealTime: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RealtimeProvider>{children}</RealtimeProvider>
);

export { RealTime };
