import { useCallback } from 'react';
import { container } from '../core/container/ServiceContainer';
import { IProductService } from '../core/interfaces/IProductRepository';
import { ProductType } from '../types/ProductType';

export function useProductService() {
  const productService = container.get<IProductService>('IProductService');

  const getProducts = useCallback(async (params: { lastProductId?: string; limit?: number }) => {
    return await productService.getProducts(params);
  }, [productService]);

  const getProduct = useCallback(async (id: string): Promise<ProductType | null> => {
    return await productService.getProduct(id);
  }, [productService]);

  return {
    getProducts,
    getProduct,
  };
}
