import { AddressDesc, CustomerProfileData } from "./CustomerProfileData";

export class OrderDesc {
    OrderId: string = '';
    OrderDate: Date = new Date();
    Customer?: CustomerProfileData | null;
    ShippingAddress?: AddressDesc;
    OrderItems: OrderItem[] = [];
    TotalAmount: number = 0;
    PaymentMethod!: string;
    OrderStatus: OrderStatus = OrderStatus.AwaitingPayment;
    DeliveryMethod!: String;
    TrackingNumber?: string;  // Optional, tracking number for shipment
    Notes?: string;  // Optional, additional order notes
    IsGift?: boolean = false;  // Whether the order is a gift
    GiftMessage?: string;
}

export class OrderItem {
    ProductId?: string;
    ProductTitle!: string;
    ProductDesc:string= '';
    Quantity: number = 1;
    Price: number = 0;
    TotalPrice: number = 0;  // Derived from Price * Quantity
}

export enum OrderStatus {
    AwaitingPayment = "AwaitingPayment",
    Paid = 'Paid',
    PaymentFailed = "PaymentFailed",
    Pending = 'Pending',
    Shipped = 'Shipped',
    Delivered = 'Delivered'
}
