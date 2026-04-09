export interface TProps {
  defaultValue: number;
  label?: string;
  onChange?: (value: number) => void;
  options: TSelectOption[];
  placeholder?: string;
}
