// ProductType import removed as it's not used in this interface

export interface IUser {
  id: number;
  externalId: string;
  attributes: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  stripeCustomerId?: string;
}

export interface IOrder {
  id: string;
  userId: number;
  amount: number;
  currency: string;
  status: string;
  createdDate: Date;
  paymentIntentID?: string;
  products: IOrderProduct[];
}

export interface IOrderProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface IDatabaseService {
  createUser(userData: Partial<IUser>): Promise<IUser>;
  getUserByExternalId(externalId: string): Promise<IUser | null>;
  createOrder(orderData: Partial<IOrder>): Promise<IOrder>;
  updateOrder(id: string, orderData: Partial<IOrder>): Promise<IOrder>;
  getOrderByPaymentIntent(paymentIntentId: string): Promise<IOrder | null>;
  deleteOrderProducts(orderId: string): Promise<void>;
}
