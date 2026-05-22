export interface TProps {
  createdAt: string;
  id: number;
  isAdmin: boolean;
  onDelete: (id: number) => void;
  ordersCount: number;
  status: TOrderStatus;
}
