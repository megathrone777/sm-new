import type React from "react";

export interface TProps {
  children: React.ReactNode;
  deleteAction: (_state: null | TActionResult, formData: FormData) => Promise<TActionResult>;
  href: __next_route_internal_types__.RouteImpl<string>;
}
