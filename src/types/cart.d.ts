import type { LatLngExpression } from "leaflet";
import type { CountryCode } from "use-telephone";

declare global {
  type TDelivery = "delivery" | "pickup";

  interface TPaymentInfo {
    change: 2000 | 5000 | null;
    type: "card" | "cardAfterDelivery" | "cash";
  }

  interface TTipsInfo {
    amount: number;
    options: number[];
    selected: number;
  }

  interface TDeliveryInfo {
    address: string;
    clientPosition: {
      lat: number;
      lng: number;
    };
    conditions: TDeliveryCondition[];
    distanceInM: number;
    email: string;
    name: string;
    phone: string;
    phoneCountryCode: CountryCode;
    pickupLocation: {
      id: null | string;
      name: null | string;
      position: number[];
    };
    price: null | number;
    route: LatLngExpression[] | null;
    time: TOption;
    type: TDelivery;
  }

  export interface TDeliveryCondition {
    amountCZK: number;
    distanceFrom: number;
    distanceTo: number;
    html: string;
    id: number;
    minimumOrderAmountCZK: number;
    text: string;
    title: string;
  }

  export interface TSchedule {
    lastTimeVicinityHidden: string;
  }

  export interface TShopSettings {
    deliveryTimeOptions: string[];
    isAvailable: boolean;
    isOpened: boolean;
    text: string;
    title: string;
  }

  export interface TFeedback {
    bgImage: string;
    buttonSendTitle: string;
    title: string;
  }

  export interface TReview {
    id: number;
    imageURL: string;
  }

  export interface TCartErrors {
    address: null | string;
    deliveryTime: boolean;
    email: boolean;
    name: boolean;
    persons: boolean;
    phone: boolean;
    pickupAddress: boolean;
  }

  interface TCart {
    createdAt: number;
    products: TProduct[];
    totalPrice: number;
    updatedAt: number;
  }

  export interface TOrder {
    client: {
      email: string;
      name: string;
      // phoneCountryCode: string;
      // phoneNumber: string;
    };
    // additionals: [];
    createdAt: number;
    products: TProduct[];
    updatedAt: number;
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
  }
}

export {};
