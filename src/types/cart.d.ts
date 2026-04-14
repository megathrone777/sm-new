import type { LatLngExpression, LatLngLiteral } from "leaflet";

declare global {
  type TDeliveryType = "delivery" | "pickup";
  type TPaymentType = "card" | "cardAfterDelivery" | "cash";
  type TCartErrorType =
    | "addressFormat"
    | "addressRange"
    | "cutlery"
    | "delivery"
    | "deliveryTime"
    | "email"
    | "name"
    | "phone"
    | "pickup"
    | "streetNumber";

  interface TClient {
    email: string;
    name: string;
    phoneNumber: string;
  }

  interface TDelivery {
    address: string;
    conditions: TDeliveryCondition[];
    distanceInM: number;
    pickupLocation: {
      name: null | string;
      position: number[];
    };
    position: LatLngLiteral;
    price: null | number;
    route: LatLngExpression[] | null;
    time: TSelectOption;
    title: string;
    type: TDeliveryType;
  }

  interface TCartAdditional extends TAdditional {
    quantity: number;
    totalPrice: number;
  }

  interface TCartModifier extends TModifier {
    subModifier?: {
      id: number;
      title: string;
    };
  }

  interface TCartProduct extends TProduct {
    modifiers: TCartModifier[];
    quantity: number;
    totalPrice: number;
  }

  interface TCart {
    additionals: TCartAdditional[];
    categoryDiscount: number;
    client: TClient;
    cutlery: {
      quantity: number;
      totalPrice: number;
    };
    delivery: TDelivery;
    errors: Partial<Record<TCartErrorType, string>>;
    note: string;
    payment: {
      change: 2000 | 5000 | null;
      type: TPaymentType;
    };
    products: TCartProduct[];
    promo: {
      code: string;
      discount: number;
    };
    tips: {
      percentage: number;
      price: number;
    };
    totalPrice: number;
  }
}

export {};
