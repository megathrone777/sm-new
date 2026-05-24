export type TIconID =
  | "address"
  | "angle"
  | "arrow"
  | "buy"
  | "car"
  | "cart"
  | "chat"
  | "checkmark"
  | "close"
  | "copy"
  | "cross"
  | "drag"
  | "email"
  | "exclamation"
  | "globe"
  | "history"
  | "invoice"
  | "locate"
  | "logout"
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
