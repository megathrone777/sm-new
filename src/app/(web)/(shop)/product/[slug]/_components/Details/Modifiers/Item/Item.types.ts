export interface TProps extends TModifier {
  isSelected: boolean;
  onAdd: (modifier: TCartModifier) => void;
  onRemove: (modifierId: TCartModifier["id"]) => void;
}
