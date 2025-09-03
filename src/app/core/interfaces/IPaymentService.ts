import { ProductType } from "../../types/ProductType";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export interface IPaymentService {
  createPaymentIntent(items: ProductType[], paymentIntentId?: string): Promise<PaymentIntent>;
  updatePaymentIntent(paymentIntentId: string, amount: number): Promise<PaymentIntent>;
  retrievePaymentIntent(paymentIntentId: string): Promise<PaymentIntent>;
}

export interface IOrderService {
  createOrder(userId: string, items: ProductType[], paymentIntentId: string): Promise<unknown>;
  updateOrder(paymentIntentId: string, items: ProductType[]): Promise<unknown>;
  getOrderByPaymentIntent(paymentIntentId: string): Promise<unknown>;
}
