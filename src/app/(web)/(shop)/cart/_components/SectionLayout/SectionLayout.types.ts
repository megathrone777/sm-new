import type React from "react";

export interface TProps {
  children: React.ReactNode;
  gridArea?: React.CSSProperties["gridArea"];
  heroChildren?: React.ReactNode;
  title: string;
}
