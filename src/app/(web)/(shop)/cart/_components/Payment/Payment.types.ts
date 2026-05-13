export interface TProps {
  deliveryType: TDeliveryType;
  payment: TCart["payment"];
  tips: TCart["tips"];
  totalPrice: number;
}
