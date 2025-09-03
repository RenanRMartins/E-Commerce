import { IDatabaseService, IUser, IOrder } from "../interfaces/IDatabaseService";
import { PrismaClient } from "@prisma/client";
import { ProductType } from "../../types/ProductType";

export class PrismaDatabaseService implements IDatabaseService {
  constructor(private prisma: PrismaClient) {}

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await this.prisma.user.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: userData as any,
    }) as IUser;
  }

  async getUserByExternalId(externalId: string): Promise<IUser | null> {
    return await this.prisma.user.findUnique({
      where: { externalId },
    }) as IUser | null;
  }

  async createOrder(orderData: Partial<IOrder>): Promise<IOrder> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await this.prisma.order.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: orderData as any,
      include: { products: true },
    }) as IOrder;
  }

  async updateOrder(id: string, orderData: Partial<IOrder>): Promise<IOrder> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await this.prisma.order.update({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: orderData as any,
      include: { products: true },
    }) as IOrder;
  }

  async getOrderByPaymentIntent(paymentIntentId: string): Promise<IOrder | null> {
    return await this.prisma.order.findFirst({
      where: { paymentIntentID: paymentIntentId },
      include: { products: true },
    }) as IOrder | null;
  }

  async deleteOrderProducts(orderId: string): Promise<void> {
    await this.prisma.product.deleteMany({
      where: { orders: { some: { id: orderId } } },
    });
  }

  // Helper method to create order data from cart items
  createOrderDataFromItems(userId: number, items: ProductType[], paymentIntentId: string, total: number) {
    return {
      user: { connect: { id: userId } },
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
  }
}
