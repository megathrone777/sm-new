import type React from "react";

export interface TProps {
  children: React.ReactNode;
  errors: Partial<Pick<TCart["errors"], "email" | "name" | "phone">>;
}
