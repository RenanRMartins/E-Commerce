export interface IPaymentMethod {
  id: string;
  name: string;
  type: 'pix' | 'credit_card';
  icon: string;
  description: string;
  isAvailable: boolean;
}

export interface IPaymentProcessor {
  processPayment(amount: number, method: IPaymentMethod): Promise<IPaymentResult>;
  validatePayment(method: IPaymentMethod, data: any): boolean;
}

export interface IPaymentResult {
  success: boolean;
  transactionId?: string;
  qrCode?: string;
  pixKey?: string;
  message: string;
  error?: string;
  paymentType?: 'pix' | 'credit_card';
}

export interface IPaymentFormData {
  method: IPaymentMethod;
  amount: number;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  creditCardInfo?: {
    number: string;
    expiry: string;
    cvv: string;
    holderName: string;
  };
}
