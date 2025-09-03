import { IOrderService } from "../interfaces/IPaymentService";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { IPaymentService } from "../interfaces/IPaymentService";
import { ProductType } from "../../types/ProductType";

export class OrderService implements IOrderService {
  constructor(
    private databaseService: IDatabaseService,
    private paymentService: IPaymentService
  ) {}

  async createOrder(userId: string, items: ProductType[], paymentIntentId: string): Promise<unknown> {
    const total = items.reduce((acc, item) => {
      return acc + (item.price || 0) * (item.quantity || 1);
    }, 0);

    const orderData = {
      user: { connect: { id: parseInt(userId) } },
      amount: total,
      currency: 'brl',
      status: 'pending',
      paymentIntentID: paymentIntentId,
      products: {
        create: items.map((item: ProductType) => ({
          name: item.name,
          description: item.description,
          quantity: item.quantity || 1,
          price: item.price || 0,
          image: item.image,
        }))
      }
    };

    return await this.databaseService.createOrder(orderData as Record<string, unknown>);
  }

  async updateOrder(paymentIntentId: string, items: ProductType[]): Promise<unknown> {
    const existingOrder = await this.databaseService.getOrderByPaymentIntent(paymentIntentId);
    
    if (!existingOrder) {
      throw new Error("Order not found");
    }

    const total = items.reduce((acc, item) => {
      return acc + (item.price || 0) * (item.quantity || 1);
    }, 0);

    // Update payment intent amount
    await this.paymentService.updatePaymentIntent(paymentIntentId, total);

    // Delete existing products and create new ones
    await this.databaseService.deleteOrderProducts(existingOrder.id);

    const updatedOrder = await this.databaseService.updateOrder(existingOrder.id, {
      amount: total,
      products: {
        create: items.map((item: ProductType) => ({
          name: item.name,
          description: item.description,
          quantity: item.quantity || 1,
          price: item.price || 0,
          image: item.image,
        }))
      }
    } as Record<string, unknown>);

    return updatedOrder;
  }

  async getOrderByPaymentIntent(paymentIntentId: string): Promise<unknown> {
    return await this.databaseService.getOrderByPaymentIntent(paymentIntentId);
  }
}
