'use client'
import { useState, useEffect } from 'react';
import { IPaymentMethod, IPaymentFormData, IPaymentResult } from '../../core/interfaces/IPaymentMethod';
import { PaymentService } from '../../core/services/PaymentService';
import PaymentMethodSelector from './PaymentMethodSelector';
import CustomerInfoForm from './CustomerInfoForm';
import CreditCardForm from './CreditCardForm';
import PixPaymentResult from './PixPaymentResult';
import CreditCardSuccess from './CreditCardSuccess';
import PixReceipt from './PixReceipt';

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  items: any[];
};

type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
};

type CreditCardInfo = {
  number: string;
  expiry: string;
  cvv: string;
  holderName: string;
};

export default function CheckoutModal({ isOpen, onClose, totalAmount, items }: CheckoutModalProps) {
  const [currentStep, setCurrentStep] = useState<'method' | 'form' | 'processing' | 'result'>('method');
  const [selectedMethod, setSelectedMethod] = useState<IPaymentMethod | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({ name: '', email: '', phone: '' });
  const [creditCardInfo, setCreditCardInfo] = useState<CreditCardInfo>({ number: '', expiry: '', cvv: '', holderName: '' });
  const [paymentResult, setPaymentResult] = useState<IPaymentResult | null>(null);
  const [paymentService] = useState(() => new PaymentService());
  const [availableMethods, setAvailableMethods] = useState<IPaymentMethod[]>([]);
  const [pixConfirmed, setPixConfirmed] = useState(false);
  const [showPixReceipt, setShowPixReceipt] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAvailableMethods(paymentService.getAvailablePaymentMethods());
      setCurrentStep('method');
      setSelectedMethod(null);
      setPaymentResult(null);
      setPixConfirmed(false);
      setShowPixReceipt(false);
    }
  }, [isOpen, paymentService]);

  const handleMethodSelect = (method: IPaymentMethod) => {
    setSelectedMethod(method);
    setCurrentStep('form');
  };

  const handleBack = () => {
    if (currentStep === 'form') {
      setCurrentStep('method');
    } else if (currentStep === 'result') {
      setCurrentStep('method');
      setPaymentResult(null);
      setPixConfirmed(false);
    }
  };

  const handlePixConfirmed = () => {
    setShowPixReceipt(true);
  };



  const handlePayment = async () => {
    if (!selectedMethod) return;

    setCurrentStep('processing');

    const paymentData: IPaymentFormData = {
      method: selectedMethod,
      amount: totalAmount,
      customerInfo,
      ...(selectedMethod.type === 'credit_card' && { creditCardInfo })
    };

    try {
      const result = await paymentService.processPayment(paymentData);
      setPaymentResult(result);
      setCurrentStep('result');
    } catch (error) {
      setPaymentResult({
        success: false,
        message: 'Erro ao processar pagamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
      setCurrentStep('result');
    }
  };

  const isFormValid = () => {
    if (!selectedMethod) return false;
    
    const hasValidCustomerInfo = customerInfo.name.trim() && customerInfo.email.trim();
    
    if (selectedMethod.type === 'credit_card') {
      const hasValidCardInfo = creditCardInfo.number.trim() && 
                              creditCardInfo.expiry.trim() && 
                              creditCardInfo.cvv.trim() && 
                              creditCardInfo.holderName.trim();
      return hasValidCustomerInfo && hasValidCardInfo;
    }
    
    return hasValidCustomerInfo;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-effect rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold gradient-text">
              {currentStep === 'method' && 'Escolha o Pagamento'}
              {currentStep === 'form' && 'Dados do Pagamento'}
              {currentStep === 'processing' && 'Processando...'}
              {currentStep === 'result' && 'Resultado do Pagamento'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {['method', 'form', 'result'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep === step || (currentStep === 'processing' && step === 'form')
                      ? 'bg-purple-500 text-white'
                      : currentStep === 'result' && index < 2
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {currentStep === 'result' && index < 2 ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < 2 && (
                    <div className={`w-12 h-1 mx-2 ${
                      currentStep === 'result' ? 'bg-green-500' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {currentStep === 'method' && (
              <PaymentMethodSelector
                methods={availableMethods}
                selectedMethod={selectedMethod}
                onMethodSelect={handleMethodSelect}
              />
            )}

            {currentStep === 'form' && selectedMethod && (
              <div className="space-y-6">
                <CustomerInfoForm
                  onInfoChange={setCustomerInfo}
                  initialInfo={customerInfo}
                />
                
                {selectedMethod.type === 'credit_card' && (
                  <CreditCardForm
                    onCardInfoChange={setCreditCardInfo}
                    initialInfo={creditCardInfo}
                  />
                )}
              </div>
            )}

            {currentStep === 'processing' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Processando Pagamento</h3>
                <p className="text-gray-300">Aguarde enquanto processamos seu pagamento...</p>
              </div>
            )}

            {currentStep === 'result' && paymentResult && (
              <>
                {paymentResult.paymentType === 'credit_card' ? (
                  <CreditCardSuccess
                    result={paymentResult}
                    onClose={onClose}
                  />
                ) : (
                  <PixPaymentResult
                    result={paymentResult}
                    onClose={onClose}
                    onPaymentConfirmed={handlePixConfirmed}
                  />
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {currentStep !== 'processing' && currentStep !== 'result' && (
            <div className="flex justify-between mt-8 pt-6 border-t border-white/20">
              <button
                onClick={currentStep === 'method' ? onClose : handleBack}
                className="group relative px-8 py-4 bg-gradient-to-r from-gray-600/20 to-gray-700/20 backdrop-blur-md border border-gray-500/30 rounded-xl text-white font-semibold hover:from-gray-500/30 hover:to-gray-600/30 hover:border-gray-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20 flex items-center space-x-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {currentStep === 'method' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  )}
                </svg>
                <span className="relative z-10">{currentStep === 'method' ? 'Cancelar' : 'Voltar'}</span>
              </button>
              
              {currentStep === 'form' && (
                <button
                  onClick={handlePayment}
                  disabled={!isFormValid()}
                  className={`group relative px-8 py-4 rounded-xl font-bold transition-all duration-500 transform flex items-center space-x-3 ${
                    isFormValid()
                      ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-md border border-purple-400/50 text-white hover:from-purple-500/90 hover:to-pink-500/90 hover:border-purple-300/70 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30'
                      : 'bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-500/30'
                  }`}
                >
                  {isFormValid() && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                  <svg className={`w-5 h-5 relative z-10 ${isFormValid() ? 'group-hover:scale-110 transition-transform duration-300' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="relative z-10">Pagar R$ {(totalAmount / 100).toFixed(2)}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Comprovante PIX */}
      {showPixReceipt && paymentResult && (
        <PixReceipt
          result={paymentResult}
          onClose={onClose}
        />
      )}
    </div>
  );
}
