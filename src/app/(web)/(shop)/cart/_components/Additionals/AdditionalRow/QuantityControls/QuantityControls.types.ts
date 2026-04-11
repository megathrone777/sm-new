export interface TProps {
  onUpdate: (type: "decrease" | "increase") => void;
  quantity: number;
}
