export type TIconID =
  | "address"
  | "angle"
  | "arrow"
  | "buy"
  | "cart"
  | "chat"
  | "checkmark"
  | "close"
  | "copy"
  | "cross"
  | "email"
  | "exclamation"
  | "globe"
  | "history"
  | "invoice"
  | "locate"
  | "minus"
  | "note"
  | "phone"
  | "plus"
  | "point"
  | "profile"
  | "promo"
  | "repeat"
  | "save"
  | "time"
  | "trash";

export interface TProps {
  className?: React.HTMLAttributes<HTMLElement>["className"];
  id: TIconID;
}
