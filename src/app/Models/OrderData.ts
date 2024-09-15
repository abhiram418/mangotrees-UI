import { AddressDesc, CustomerProfileData } from "./CustomerProfileData";

export class OrderDesc {
    constructor(id:string){
        this.OrderId = id;
    }
    OrderId: string = '';
    OrderDate: Date = new Date();
    Customer?: CustomerProfileData | null;
    ShippingAddress?: AddressDesc;
    OrderItems: OrderItem[] = [];
    TotalAmount: number = 0;
    PaymentMethod: string = '';
    OrderStatus: OrderStatus = OrderStatus.Paid;
    DeliveryDate?: Date | null;
    TrackingNumber?: string;  // Optional, tracking number for shipment
    Notes?: string;  // Optional, additional order notes
    IsGift?: boolean = false;  // Whether the order is a gift
    GiftMessage?: string;
}

export class OrderItem {
    constructor(id:string){
        this.ProductId = id;
    }
    ProductId?: string;
    ProductTitle: string = 'Product Title';
    ProductDesc:string= '';
    Quantity: number = 1;
    Price: number = 0;
    TotalPrice: number = 0;  // Derived from Price * Quantity
}

export enum OrderStatus {
    Paid = 'Paid',
    Pending = 'Pending',
    Shipped = 'Shipped',
    Delivered = 'Delivered'
}
