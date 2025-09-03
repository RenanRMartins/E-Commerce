import { IPaymentService, PaymentIntent } from "../interfaces/IPaymentService";
import { ProductType } from "../../types/ProductType";
import Stripe from "stripe";

export class StripePaymentService implements IPaymentService {
  constructor(private stripe: Stripe) {}

  private calculateOrderAmount(items: ProductType[]): number {
    return items.reduce((acc, item) => {
      return acc + (item.price || 0) * (item.quantity || 1);
    }, 0);
  }

  async createPaymentIntent(items: ProductType[], paymentIntentId?: string): Promise<PaymentIntent> {
    const amount = this.calculateOrderAmount(items);

    if (paymentIntentId) {
      return await this.updatePaymentIntent(paymentIntentId, amount);
    }

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      automatic_payment_methods: { enabled: true },
    });

    return {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    };
  }

  async updatePaymentIntent(paymentIntentId: string, amount: number): Promise<PaymentIntent> {
    const paymentIntent = await this.stripe.paymentIntents.update(paymentIntentId, {
      amount,
    });

    return {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    };
  }

  async retrievePaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

    return {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    };
  }
}
