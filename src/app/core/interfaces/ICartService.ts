import { ProductType } from "../../types/ProductType";

export interface ICartService {
  addProduct(product: ProductType): void;
  removeProduct(product: ProductType): void;
  getCart(): ProductType[];
  clearCart(): void;
  getTotalPrice(): number;
  getTotalItems(): number;
}

export interface ICartStore {
  cart: ProductType[];
  isOpen: boolean;
  paymentIntent: string;
  addProduct: (product: ProductType) => void;
  removeProduct: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void;
  toggleCart: () => void;
  setPaymentIntent: (paymentIntent: string) => void;
}
