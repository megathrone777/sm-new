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
    // options: number[];
    // selected: number;
  }

  interface TClientInfo {
    address: string;
    email: string;
    name: string;
    phone: string;
    phoneCountryCode: CountryCode;
  }

  interface TDeliveryInfo {
    clientPosition: LatLngLiteral;
    conditions: TDeliveryCondition[];
    distanceInM: number;
    pickupLocation: {
      id: null | string;
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

  interface TCartProduct extends TProduct {
    quantity: number;
    totalPrice: number;
  }

  interface TCart {
    clientInfo: TClientInfo;
    deliveryInfo: TDeliveryInfo;
    note: string;
    paymentInfo: TPaymentInfo;
    products: TProduct[];
    tipsInfo: TTipsInfo;
    totalPrice: number;
  }

  interface TOrder extends TCart {
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
  // additionals: [];
  // createdAt: number;
  // products: TProduct[];
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
