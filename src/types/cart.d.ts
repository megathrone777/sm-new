import type { LatLngExpression, LatLngLiteral } from "leaflet";
import type { CountryCode } from "use-telephone";

declare global {
  type TDeliveryType = "delivery" | "pickup";

  interface TPaymentInfo {
    change: 2000 | 5000 | null;
    type: "card" | "cardAfterDelivery" | "cash";
  }

  interface TTipsInfo {
    amount: number;
    price: number;
  }

  interface TClientInfo {
    email: string;
    name: string;
    phone: string;
    phoneCountryCode: CountryCode;
  }

  interface TDeliveryInfo {
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
    modifiers: TCartModifier[];
    quantity: number;
    totalPrice: number;
  }

  interface TCart {
    additionals: TCartAdditional[];
    clientInfo: TClientInfo;
    deliveryInfo: TDeliveryInfo;
    errors: TCartErrors;
    note: string;
    paymentInfo: TPaymentInfo;
    persons: number;
    products: TCartProduct[];
    promoCode: string;
    promoDiscount: number;
    tipsInfo: TTipsInfo;
    totalPrice: number;
  }

  interface TOrder {
    createdAt: number;
    updatedAt: number;
  }

  // export interface TOrder {
  //   client: {
  //     email: string;
  //     name: string;
  // phoneCountryCode: string;
  // phoneNumber: string;
  // };
  // createdAt: number;
  // updatedAt: number;
  // cutleryAmountCZK: number;
  // cutleryCount: number;
  // deliveryAddress: string;
  // deliveryAddressDistrict: string;
  // deliveryAmountCZK: string;
  // deliveryCoordinates: string;
  // deliveryDistance: number;
  // deliveryTime: null | string;
  // deliveryType: string;
  // district: string;
  // id: number;
  // items: [];
  // itemsDiscountSuggestion: string;
  // note: number;
  // paymentType: string;
  // possiblePickupDiscountCZK: number;
  // promocode: string;
  // promocodeDiscountAmountCZK: number;
  // tipAmount: number;
  // tipAmountCZK: number;
  // totalAdditionalsAmountCZK: number;
  // totalAmountCZK: number;
  // totalItemsAmountCZK: string;
  // }
}

export {};
