export interface TProps extends Pick<TOrder, "courier" | "deliveryCoordinates"> {
  initialStatus: TOrderStatus;
  orderId: number;
}
