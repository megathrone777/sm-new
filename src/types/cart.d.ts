import type { LatLngExpression, LatLngLiteral } from "leaflet";

declare global {
  type TDeliveryType = "delivery" | "pickup";
  type TPaymentType = "card" | "cardAfterDelivery" | "cash";

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
    id: number;
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

  interface TCartErrors {
    address: null | string;
    deliveryTime: boolean;
    email: boolean;
    name: boolean;
    persons: boolean;
    phone: boolean;
    pickupAddress: boolean;
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
    addedFromList: boolean;
    modifiers: TCartModifier[];
    quantity: number;
    totalPrice: number;
  }

  interface TCart {
    additionals: TCartAdditional[];
    client: TClient;
    delivery: TDelivery;
    errors: TCartErrors;
    note: string;
    payment: TPayment;
    persons: number;
    products: TCartProduct[];
    promoCode: string;
    promoDiscount: number;
    tips: TTips;
    totalPrice: number;
  }
}

export {};
