import { CustomerDetailsApiData } from "./ApiModels/CustomerData";
import { AddressDesc } from "./CustomerProfileData";

export class OrderDesc {
    OrderId: string = '';
    OrderDate: Date = new Date();
    Customer?: CustomerDetailsApiData | null;
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

export class CustomerOrder {
    OrderDate: Date = new Date();
    ShippingAddress?: string;
    OrderItems: OrderItem[] = [];
    TotalAmount: number = 0;
    PaymentMethod!: string;
    PackagingMethod!: string;
    DeliveryMethod!: DeliveryMethodModel;
    Notes?: string;  // Optional, additional order notes
    IsGift?: boolean;  // Whether the order is a gift
    GiftMessage?: string;
    DiscountedAmount?: number;
    PromotionApplied?: string;
}

export class OrderItem {
    ProductId?: string;
    ProductTitle!: string;
    ProductDesc:string= '';
    Image!: string;
    Quantity!: number;
    Units!: number;
    Weight!: number;
    ItemMaxCount!: number;
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

export class DeliveryMethodModel{
    DeliveryMethod!: string;
    Cost!: number;
}

export class ChargesModel{
    Premium!: number;
    PocketFriendly!: number;
    Basic!: number;
    Dedicated!: number;
    ThirdParty!: number;
    APSRTC!: number;
}
