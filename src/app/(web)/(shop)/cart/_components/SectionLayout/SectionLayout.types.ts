import type React from "react";

export interface TProps {
  children: React.ReactNode;
  error?: string;
  gridArea?: React.CSSProperties["gridArea"];
  heroChildren?: React.ReactNode;
  id?: React.HTMLAttributes<HTMLDivElement>["id"];
  title: string;
}
