import { IPaymentProcessor, IPaymentMethod, IPaymentResult, IPaymentFormData } from '../interfaces/IPaymentMethod';
import { PixPaymentProcessor } from './PixPaymentProcessor';
import { CreditCardPaymentProcessor } from './CreditCardPaymentProcessor';
import { logger } from '../logging/Logger';

export class PaymentService {
  private processors: Map<string, IPaymentProcessor> = new Map();

  constructor() {
    this.initializeProcessors();
  }

  private initializeProcessors(): void {
    this.processors.set('pix', new PixPaymentProcessor());
    this.processors.set('credit_card', new CreditCardPaymentProcessor());
    logger.info('Payment processors initialized');
  }

  async processPayment(paymentData: IPaymentFormData): Promise<IPaymentResult> {
    try {
      logger.info('Processing payment', { 
        method: paymentData.method.name, 
        amount: paymentData.amount 
      });

      const processor = this.processors.get(paymentData.method.type);
      if (!processor) {
        throw new Error(`Payment processor not found for method: ${paymentData.method.type}`);
      }

      // Validar dados do pagamento
      if (!processor.validatePayment(paymentData.method, paymentData)) {
        throw new Error('Invalid payment data');
      }

      const result = await processor.processPayment(paymentData.amount, paymentData.method);
      
      logger.info('Payment processed', { 
        success: result.success, 
        transactionId: result.transactionId 
      });

      return result;
    } catch (error) {
      logger.error('Error in payment service', error);
      return {
        success: false,
        message: 'Erro interno do sistema de pagamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  getAvailablePaymentMethods(): IPaymentMethod[] {
    return [
      {
        id: 'pix',
        name: 'PIX',
        type: 'pix',
        icon: 'pix',
        description: 'Pagamento instantâneo via PIX',
        isAvailable: true
      },
      {
        id: 'credit_card',
        name: 'Cartão de Crédito',
        type: 'credit_card',
        icon: 'credit-card',
        description: 'Visa, Mastercard, Elo',
        isAvailable: true
      }
    ];
  }
}
