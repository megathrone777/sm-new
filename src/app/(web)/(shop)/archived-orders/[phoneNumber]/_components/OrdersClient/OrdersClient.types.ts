export interface TArchivedOrder extends TOrder {
  canRepeat: boolean;
  hasInvoice: boolean;
}

export interface TProps {
  orders: TArchivedOrder[];
}
