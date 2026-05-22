export interface TDeliveryOrder {
  deliveryTime: string;
  id: number;
  onlinePaymentStatus: null | TOnlinePaymentStatus;
  paymentType: TPaymentType;
  position: [number, number];
  status: TOrderStatus;
}

export interface TProps {
  orders: TOrder[];
}
