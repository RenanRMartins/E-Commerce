'use server';
import { container } from "./core/container/ServiceContainer";
import { IProductService } from "./core/interfaces/IProductRepository";
import "./core/container/containerConfig";

export async function fetchProducts({ lastProductId }: { lastProductId?: string | undefined }) {
    try {
        if (!container.isRegistered('IProductService')) {
            // Return empty data if services are not configured
            return {
                formatedProducts: [],
                has_more: false
            };
        }
        
        const productService = container.get<IProductService>('IProductService');
        
        const result = await productService.getProducts({ 
            lastProductId, 
            limit: 12 
        });
        
        return {
            formatedProducts: result.products,
            has_more: result.hasMore
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        // Return empty data on error
        return {
            formatedProducts: [],
            has_more: false
        };
    }
}