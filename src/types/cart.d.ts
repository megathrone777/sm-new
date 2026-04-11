import type { LatLngExpression, LatLngLiteral } from "leaflet";

declare global {
  type TDeliveryType = "delivery" | "pickup";
  type TPaymentType = "card" | "cardAfterDelivery" | "cash";
  type TCartErrorType =
    | "addressRange"
    | "cutleryCount"
    | "delivery"
    | "deliveryTime"
    | "email"
    | "name"
    | "phone"
    | "pickup"
    | "streetNumber";

  interface TPayment {
    change: 2000 | 5000 | null;
    type: TPaymentType;
  }

  interface TTips {
    amount: number;
    price: number;
  }

  interface TClient {
    email: string;
    name: string;
    phoneNumber: string;
  }

  interface TDelivery {
    address: string;
    clientPosition: LatLngLiteral;
    conditions: TDeliveryCondition[];
    distanceInM: number;
    pickupLocation: {
      name: null | string;
      position: number[];
    };
    price: null | number;
    route: LatLngExpression[] | null;
    time: TSelectOption;
    title: string;
    type: TDeliveryType;
  }

  interface TCartError {
    message: string;
    type: TCartErrorType;
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
    cutleryCount: number;
    cutleryPrice: number;
    delivery: TDelivery;
    errors: TCartError[];
    note: string;
    payment: TPayment;
    products: TCartProduct[];
    promoCode: string;
    promoDiscount: number;
    tips: TTips;
    totalPrice: number;
  }
}

export {};
