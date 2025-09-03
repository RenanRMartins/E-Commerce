import { IPaymentProcessor, IPaymentMethod, IPaymentResult } from '../interfaces/IPaymentMethod';
import { logger } from '../logging/Logger';

export class CreditCardPaymentProcessor implements IPaymentProcessor {
  async processPayment(amount: number, method: IPaymentMethod): Promise<IPaymentResult> {
    try {
      logger.info('Processing credit card payment', { amount, method: method.name });

      // Simular validação do cartão
      const transactionId = this.generateTransactionId();
      
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular aprovação (90% de chance)
      const isApproved = Math.random() > 0.1;

      if (isApproved) {
        logger.info('Credit card payment approved', { transactionId });
        return {
          success: true,
          transactionId,
          message: 'Pagamento aprovado! Seu pedido foi processado com sucesso.',
          paymentType: 'credit_card'
        };
      } else {
        logger.warn('Credit card payment declined', { transactionId });
        return {
          success: false,
          message: 'Pagamento recusado. Verifique os dados do cartão e tente novamente.',
          error: 'Cartão recusado'
        };
      }
    } catch (error) {
      logger.error('Error processing credit card payment', error);
      return {
        success: false,
        message: 'Erro ao processar pagamento com cartão',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  validatePayment(method: IPaymentMethod, data: any): boolean {
    if (method.type !== 'credit_card' || !method.isAvailable) {
      return false;
    }

    // Validar dados do cartão
    const { creditCardInfo } = data;
    if (!creditCardInfo) return false;

    return this.validateCreditCard(creditCardInfo);
  }

  private validateCreditCard(cardInfo: any): boolean {
    const { number, expiry, cvv, holderName } = cardInfo;
    
    // Validações básicas
    if (!number || !expiry || !cvv || !holderName) return false;
    if (number.replace(/\s/g, '').length < 13) return false;
    if (cvv.length < 3) return false;
    if (holderName.trim().length < 2) return false;

    // Validar formato da data
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiry)) return false;

    return true;
  }

  private generateTransactionId(): string {
    return `cc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
