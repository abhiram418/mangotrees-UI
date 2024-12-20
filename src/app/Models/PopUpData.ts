export class PopUpData{
    // Delivery Services
    APSRTC:string = "We utilize APSRTC cargo services for cost-effective delivery within Andhra Pradesh and Hyderabad. This option is pocket-friendly, making it a great choice for saving on delivery costs. However, please note that customers will need to collect their orders from the designated APSRTC pickup location in their area." //  Door delivery is available subject to location availability
    Third_Party:string = "This option may be slightly more expensive than APSRTC cargo services, but it offers the convenience of door delivery across a wider range of locations. It is our recommended choice for reliable and straightforward delivery to your doorstep."
    Dedicated:string = "For large orders, our dedicated truck delivery service provides timely and highly reliable delivery. This option is ideal for bulk purchases, ensuring your order arrives on schedule and in perfect condition."
    // Packaging
    Premium:string = "Our Premium Packaging is the default and most recommended option. It is designed not only to protect your mangoes during transit but also to serve as an ideal storage solution for ripening. This packaging offers the best combination of safety and quality, ensuring your mangoes arrive in perfect condition."
    Pocket_Friendly:string = "The Pocket Friendly Packaging option is a more economical choice for those looking to save money. While it provides adequate protection, it does not offer the same level of durability or storage benefits as the Premium Packaging. It is a practical option for those with budget considerations."
    Basic:string = "This cost-efficient option is ideal for those who prefer to pick up their mangoes directly. It is a simple, no-frills packaging designed for convenience when transporting mangoes to nearby locations. Please note, this packaging offers minimal protection and is recommended for short distances only."
}

export enum DeliveryType {
    RTC = "APSRTC",
    RTC_Title = "APSRTC Delivery",
    Third_Party = "Third-Party",
    Third_Party_Title = "Third Party Delivery",
    Dedicated = "Dedicated",
    Dedicated_Title = "Dedicated Truck Delivery"
}

export enum PackagingType {
    Premium = "Premium",
    Premium_Title = "Premium Packaging",
    Pocket_Friendly_Title = "Pocket Friendly Packaging",
    Pocket_Friendly = "Pocket-Friendly",
    Basic = "Basic",
    Basic_Title = "Basic Packaging"
}