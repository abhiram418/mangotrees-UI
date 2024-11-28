export class ProductApiData {
    ProductId!: string;
    Images: string[] = [];
    Title!: string;
    Desc!: string;
    ProductInfo!: string;
    NutritionFacts: string[] = [];
    Price!: number ;
    InventoryId!: string;
    Availability!: boolean | null;
    Available!: string;
    Stars!: number;
    NumberOfRating!: number;
    ProductReviewData: string[] = [];
    DealTitle?: string | null = null;  // Deal title might be null
    Discount?: number | null = null;  // Discount can be null
    SalePrice?: number | null = null;  // Sale price can be null
}

export class ProductItemApiData{
    ProductId!: string;
    Image!: string;
    Title!: string;
    Desc!: string;
    Price!: number;
    Stars!: number;
    NumberOfRating!: number;
    Availability: boolean | null = true;
    DealTitle?: string | null = null;
    Discount?: number | null = null; 
    SalePrice?: number | null = null;
}
  
  