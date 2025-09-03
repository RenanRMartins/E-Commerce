import { IPaymentService } from '../interfaces/IPaymentService';
import { ProductType } from '../../types/ProductType';

export class MockPaymentService implements IPaymentService {
  async createPaymentIntent(items: ProductType[]): Promise<any> {
    const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    
    return {
      id: `pi_mock_${Date.now()}`,
      amount: total,
      status: 'requires_payment_method',
      client_secret: `pi_mock_${Date.now()}_secret`
    };
  }

  async retrievePaymentIntent(paymentIntentId: string): Promise<any> {
    return {
      id: paymentIntentId,
      amount: 10000,
      status: 'requires_payment_method',
      client_secret: `${paymentIntentId}_secret`
    };
  }

  async updatePaymentIntent(paymentIntentId: string, items: ProductType[]): Promise<any> {
    const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    
    return {
      id: paymentIntentId,
      amount: total,
      status: 'requires_payment_method',
      client_secret: `${paymentIntentId}_secret`
    };
  }
}
