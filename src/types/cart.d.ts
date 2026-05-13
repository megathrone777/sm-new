import type { LatLngExpression } from "leaflet";

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
    | "promo"
    | "streetNumber";

  interface TAddressSuggestion {
    location: string;
    name: string;
    position: {
      lat: number;
      lon: number;
    };
  }

  interface TClient {
    email: string;
    name: string;
    phoneNumber: string;
  }

  interface TDelivery {
    address: string;
    conditions: TDeliveryCondition[];
    distanceInM: number;
    position: LatLngExpression[] | null;
    price: null | number;
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
