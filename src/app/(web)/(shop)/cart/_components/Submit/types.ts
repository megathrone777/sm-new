export interface TProps {
  deliveryConditions: TDeliveryCondition[];
  lastTimeVicinityHidden: string;
  scrolledToTop: boolean;
}

export interface TState {
  isDisabled: boolean;
  isSubmiting: boolean;
}
