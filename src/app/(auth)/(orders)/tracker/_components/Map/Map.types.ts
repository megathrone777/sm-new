export interface TCourierState {
  "courier-1": { latitude: number; longitude: number };
  "courier-2": { latitude: number; longitude: number };
}

export interface TProps {
  initialOrders: TOrder[];
}
