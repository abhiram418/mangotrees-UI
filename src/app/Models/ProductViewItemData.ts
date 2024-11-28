export class ProductViewItemData{
    ProductId?: string;
    Images:any[] = [];
    Title!:string;
    Desc!:string;
    ProductInfo!:ProductInfo;
    NutritionFacts?:string[] | null;
    Price!:number;
    InventoryId!: string;
    Availability!:boolean;
    AvailabilityTitle!:string;
    Stars!: number;
    NumberOfRating!:number;
    ProductReviewData!:ProductReviewData[] | null;
    DealTitle?:string | null;
    Discount?:number | null;
    SalePrice?:number | null;
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
    ReviewerName!:string;
    Rating!:number;
    Title!:string;
    Date:Date = new Date();
    Review!:string;
}