declare global {
  type TOnlinePaymentStatus = "CANCELLED" | "PAID";
  type TOrderStatus = "done" | "new" | "placed" | "ready" | "started" | "took";

  interface TOrderAdditional extends TAdditional {
    quantity: number;
    totalPrice: number;
  }

  interface TOrderProduct extends TProduct {
    modifiers: TCartModifier[];
    quantity: number;
    totalPrice: number;
  }

  interface TOrder {
    additionals: TOrderAdditional[];
    clientEmail: TClient["email"];
    clientName: TClient["name"];
    clientOrdersCount: number;
    clientPhoneNumber: TClient["phoneNumber"];
    comgateProcessedAt: string;
    comgateTransId: string;
    courier: string;
    createdAt: string;
    cutleryCount: number;
    cutleryCountToPay: number;
    cutleryPrice: number;
    deliveryAddress: string;
    deliveryAddressDistrict: string;
    deliveryCoordinates: string;
    deliveryDistance: number;
    deliveryPrice: number;
    deliveryTime: string;
    deliveryTitle: string;
    deliveryType: TDeliveryType;
    id: number;
    note: string;
    onlinePaymentStatus: null | TOnlinePaymentStatus;
    paymentType: TPaymentType;
    products: TOrderProduct[];
    promocode: string;
    promocodeDiscountPrice: number;
    status: TOrderStatus;
    timeout: number;
    tipsAmount: number;
    tipsPrice: number;
    totalAdditionalsPrice: number;
    totalPrice: number;
    totalProductsPrice: number;
  }

  interface TDeliveryOrder extends Pick<
    TOrder,
    "deliveryTime" | "id" | "onlinePaymentStatus" | "paymentType" | "status"
  > {
    position: [number, number];
  }
}

export {};
