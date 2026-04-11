export type TIconID =
  | "address"
  | "angle"
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
  | "globe"
  | "minus"
  | "note"
  | "phone"
  | "plus"
  | "point"
  | "profile"
  | "promo"
  | "save"
  | "time"
  | "trash";

export interface TProps {
  className?: React.HTMLAttributes<HTMLElement>["className"];
  id: TIconID;
}
