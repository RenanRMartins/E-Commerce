import { IProductService, IProductRepository } from "../interfaces/IProductRepository";
import { ProductType } from "../../types/ProductType";
import { logger } from "../logging/Logger";
import { AppError } from "../errors/AppError";

export class ProductService implements IProductService {
  constructor(private productRepository: IProductRepository) {}

  async getProducts(params: { lastProductId?: string; limit?: number }): Promise<{
    products: ProductType[];
    hasMore: boolean;
  }> {
    logger.info('Fetching products', { params });
    
    try {
      const result = await this.productRepository.fetchProducts(params);
      logger.info('Products fetched successfully', { count: result.products.length });
      return result;
    } catch (error) {
      logger.error('Error fetching products', error);
      throw AppError.externalService('Falha ao buscar produtos');
    }
  }

  async getProduct(id: string): Promise<ProductType | null> {
    logger.info('Fetching product by ID', { id });
    
    if (!id || id.trim().length === 0) {
      throw AppError.validation('ID do produto é obrigatório');
    }
    
    try {
      const product = await this.productRepository.getProductById(id);
      logger.info('Product fetched successfully', { id, found: !!product });
      return product;
    } catch (error) {
      logger.error('Error fetching product', { id, error });
      throw AppError.externalService('Falha ao buscar produto');
    }
  }
}
