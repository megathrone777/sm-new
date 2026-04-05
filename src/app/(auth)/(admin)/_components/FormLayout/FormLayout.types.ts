import type React from "react";

export interface TProps {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  formAction: (_state: null | TActionResult, formData: FormData) => Promise<null | TActionResult>;
  layoutClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
}
