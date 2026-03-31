export type TIconID =
  | "address"
  | "arrow"
  | "buy"
  | "cart"
  | "chat"
  | "checkmark"
  | "close"
  | "cross"
  | "email"
  | "exclamation"
  | "exclamation"
  | "minus"
  | "note"
  | "phone"
  | "plus"
  | "point"
  | "profile"
  | "promo"
  | "time";

export interface TProps {
  className?: React.HTMLAttributes<HTMLElement>["className"];
  id: TIconID;
}
