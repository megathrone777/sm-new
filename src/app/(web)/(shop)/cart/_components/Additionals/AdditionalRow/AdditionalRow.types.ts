export interface TProps extends TCartAdditional {
  onUpdate: (type: "decrease" | "increase") => void;
}
