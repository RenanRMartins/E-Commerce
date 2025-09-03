import { ProductType } from "../../types/ProductType";

export interface IProductRepository {
  fetchProducts(params: { lastProductId?: string; limit?: number }): Promise<{
    products: ProductType[];
    hasMore: boolean;
  }>;
  
  getProductById(id: string): Promise<ProductType | null>;
}

export interface IProductService {
  getProducts(params: { lastProductId?: string; limit?: number }): Promise<{
    products: ProductType[];
    hasMore: boolean;
  }>;
  
  getProduct(id: string): Promise<ProductType | null>;
}
