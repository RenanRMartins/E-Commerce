import { useCallback, useState } from 'react';
import { container } from '../core/container/ServiceContainer';
import { IPaymentService, PaymentIntent } from '../core/interfaces/IPaymentService';
import { ProductType } from '../types/ProductType';

export function usePaymentService() {
  const paymentService = container.get<IPaymentService>('IPaymentService');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentIntent = useCallback(async (items: ProductType[], paymentIntentId?: string): Promise<PaymentIntent | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await paymentService.createPaymentIntent(items, paymentIntentId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return null;
    } finally {
      setLoading(false);
    }
  }, [paymentService]);

  const updatePaymentIntent = useCallback(async (paymentIntentId: string, amount: number): Promise<PaymentIntent | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await paymentService.updatePaymentIntent(paymentIntentId, amount);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return null;
    } finally {
      setLoading(false);
    }
  }, [paymentService]);

  const retrievePaymentIntent = useCallback(async (paymentIntentId: string): Promise<PaymentIntent | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await paymentService.retrievePaymentIntent(paymentIntentId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return null;
    } finally {
      setLoading(false);
    }
  }, [paymentService]);

  return {
    createPaymentIntent,
    updatePaymentIntent,
    retrievePaymentIntent,
    loading,
    error,
  };
}
