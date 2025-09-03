import { IProductRepository } from "../interfaces/IProductRepository";
import { ProductType } from "../../types/ProductType";
import Stripe from "stripe";

export class StripeProductRepository implements IProductRepository {
  constructor(private stripe: Stripe) {}

  async fetchProducts(params: { lastProductId?: string; limit?: number }): Promise<{
    products: ProductType[];
    hasMore: boolean;
  }> {
    const stripeParams = params.lastProductId 
      ? { starting_after: params.lastProductId, limit: params.limit || 12 }
      : { limit: params.limit || 12 };
    
    const { data: products, has_more } = await this.stripe.products.list(stripeParams);
    
    const formattedProducts = await Promise.all(
      products.map(async (product) => {
        const price = await this.stripe.prices.list({
          product: product.id,
        });
        return {
          id: product.id,
          price: price.data[0].unit_amount,
          name: product.name,
          image: product.images[0],
          description: product.description,
          currency: price.data[0].currency,
        } as ProductType;
      })
    );

    return {
      products: formattedProducts,
      hasMore: has_more
    };
  }

  async getProductById(id: string): Promise<ProductType | null> {
    try {
      const product = await this.stripe.products.retrieve(id);
      const price = await this.stripe.prices.list({
        product: product.id,
      });

      return {
        id: product.id,
        price: price.data[0].unit_amount,
        name: product.name,
        image: product.images[0],
        description: product.description,
        currency: price.data[0].currency,
      } as ProductType;
    } catch {
      return null;
    }
  }
}
