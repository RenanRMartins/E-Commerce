import { IProductRepository } from '../interfaces/IProductRepository';
import { ProductType } from '../../types/ProductType';

export class MockProductRepository implements IProductRepository {
  private mockProducts: ProductType[] = [
    {
      id: '1',
      name: 'Vestido Elegante',
      price: 29900,
      unit_amount: 29900,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop',
      description: 'Vestido elegante para ocasiões especiais',
      currency: 'brl'
    },
    {
      id: '2',
      name: 'Blusa Moderna',
      price: 12900,
      unit_amount: 12900,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop',
      description: 'Blusa moderna e confortável',
      currency: 'brl'
    },
    {
      id: '3',
      name: 'Calça Jeans',
      price: 19900,
      unit_amount: 19900,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop',
      description: 'Calça jeans clássica e versátil',
      currency: 'brl'
    },
    {
      id: '4',
      name: 'Jaqueta de Couro',
      price: 39900,
      unit_amount: 39900,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop',
      description: 'Jaqueta de couro autêntica',
      currency: 'brl'
    },
    {
      id: '5',
      name: 'Saia Longa',
      price: 15900,
      unit_amount: 15900,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop',
      description: 'Saia longa elegante e confortável',
      currency: 'brl'
    },
    {
      id: '6',
      name: 'Camiseta Básica',
      price: 4900,
      unit_amount: 4900,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop',
      description: 'Camiseta básica de algodão',
      currency: 'brl'
    },
    {
      id: '7',
      name: 'Conjunto Esportivo',
      price: 24900,
      unit_amount: 24900,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=600&fit=crop',
      description: 'Conjunto esportivo moderno',
      currency: 'brl'
    },
    {
      id: '8',
      name: 'Vestido de Festa',
      price: 59900,
      unit_amount: 59900,
      image: 'https://images.unsplash.com/photo-1566479179817-c0d9d0d0b1b1?w=400&h=600&fit=crop',
      description: 'Vestido de festa luxuoso',
      currency: 'brl'
    }
  ];

  async getProducts({ lastProductId, limit = 12 }: { lastProductId?: string; limit?: number }): Promise<{ products: ProductType[]; hasMore: boolean }> {
    const startIndex = lastProductId ? this.mockProducts.findIndex(p => p.id === lastProductId) + 1 : 0;
    const endIndex = startIndex + limit;
    const products = this.mockProducts.slice(startIndex, endIndex);
    const hasMore = endIndex < this.mockProducts.length;

    return {
      products,
      hasMore
    };
  }

  async getProduct(id: string): Promise<ProductType | null> {
    return this.mockProducts.find(p => p.id === id) || null;
  }
}
