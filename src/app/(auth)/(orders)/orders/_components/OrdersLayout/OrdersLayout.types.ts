import type React from "react";

export interface TProps {
  initialOrders: TOrder[];
  isAdmin: boolean;
  placeholder: React.ReactNode;
}
