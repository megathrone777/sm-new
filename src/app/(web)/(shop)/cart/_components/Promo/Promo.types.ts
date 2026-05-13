export interface TProps {
  addressError?: string;
  delivery: TDelivery;
  phoneError?: string;
  phoneNumber: string;
  promo: TCart["promo"];
  promoError?: string;
}
