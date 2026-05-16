import type React from "react";

export interface TProps extends TClient {
  children: React.ReactNode;
  errors: Partial<Pick<TCart["errors"], "email" | "name" | "phone">>;
}
