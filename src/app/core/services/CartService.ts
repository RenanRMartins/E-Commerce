import { ICartService } from "../interfaces/ICartService";
import { ProductType } from "../../types/ProductType";

export class CartService implements ICartService {
  private cart: ProductType[] = [];

  addProduct(product: ProductType): void {
    const existingProduct = this.cart.find((p) => p.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  removeProduct(product: ProductType): void {
    const existingProduct = this.cart.find((p) => p.id === product.id);

    if (existingProduct && existingProduct.quantity! > 1) {
      existingProduct.quantity = existingProduct.quantity! - 1;
    } else {
      this.cart = this.cart.filter((p) => p.id !== product.id);
    }
  }

  getCart(): ProductType[] {
    return [...this.cart];
  }

  clearCart(): void {
    this.cart = [];
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => {
      return total + (item.price || 0) * (item.quantity || 1);
    }, 0);
  }

  getTotalItems(): number {
    return this.cart.reduce((total, item) => {
      return total + (item.quantity || 1);
    }, 0);
  }
}
