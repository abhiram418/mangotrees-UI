export class ProductViewItemData{
    ProductId?: string;
    Images:any[] = [];
    Title:string='Whereas recognition of the inherent dignity';
    Desc:string='dmasjndflsnflksdmdmasjndflsnflksdmdmasjndflsnflksdm';
    ProductInfo!:ProductInfo;
    NutritionFacts?:string[];
    Price:number | null = 1000;
    InventoryId!: string;
    Availability:boolean | null = true;
    Available:string = "In stock"
    Stars: number = 3;
    NumberOfRating:number = 2398;
    ProductReviewData!:ProductReviewData[];
    DealTitle?:string | null='Limited time deal';
    Discount?:number | null=-35;
    SalePrice?:number | null=650;
}


export class ProductInfo{
    NumberOfMangoes!: number; 
    Weight!: number;
    Variety!: string;          // Type of mango (e.g., Alphonso, Kesar, etc.)
    RipenessLevel!: RipenessLevel;     // Level of ripeness (e.g., Unripe, Ripe, Overripe)
    StorageInstructions!: string;
}

export enum RipenessLevel{
    Unripe = 'Unripe',
    Ripe = 'Ripe',
    Overripe = 'Overripe'
}

export class ProductReviewData{
    ReviewerName:string = "Guest";
    Rating:number = 5;
    Title:string = "Product Review Title";
    Date:Date = new Date();
    Review:string = "The packaging is excellent, ensuring the figs stay fresh and flavorful. I appreciate that they are free from any additives or preservatives, making them a healthy choice for anyone looking to incorporate more natural foods into their diet.";
}