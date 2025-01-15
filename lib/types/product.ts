export interface ProductInfo {
  product_name: string;
  product_description: string;
  problem_their_solving: string;
  unique_selling_point: string;
  features: string;
  customer_reviews: string;
  pricing: string;
}

export interface ApiResponse {
  product_information: ProductInfo;
  screenshot: {
    data: string;
    dimensions: {
      width: number;
      height: number;
    };
  };
}