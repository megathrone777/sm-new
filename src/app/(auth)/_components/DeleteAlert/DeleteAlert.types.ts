import type { LinkProps } from "next/link";

export interface TProps {
  action: (_state: null | TActionResult, formData: FormData) => Promise<TActionResult>;
  deleteId: null | string;
  deleteTitle: null | string;
  href: LinkProps<string>["href"];
}
