'use client'
import { useState } from 'react';

type CreditCardInfo = {
  number: string;
  expiry: string;
  cvv: string;
  holderName: string;
};

type CreditCardFormProps = {
  onCardInfoChange: (info: CreditCardInfo) => void;
  initialInfo?: Partial<CreditCardInfo>;
};

export default function CreditCardForm({ onCardInfoChange, initialInfo = {} }: CreditCardFormProps) {
  const [cardInfo, setCardInfo] = useState<CreditCardInfo>({
    number: initialInfo.number || '',
    expiry: initialInfo.expiry || '',
    cvv: initialInfo.cvv || '',
    holderName: initialInfo.holderName || ''
  });

  const handleChange = (field: keyof CreditCardInfo, value: string) => {
    let formattedValue = value;

    // Formatação específica para cada campo
    switch (field) {
      case 'number':
        // Remove espaços e adiciona espaços a cada 4 dígitos
        formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
        break;
      case 'expiry':
        // Formato MM/YY
        formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2');
        break;
      case 'cvv':
        // Apenas números, máximo 4 dígitos
        formattedValue = value.replace(/\D/g, '').slice(0, 4);
        break;
    }

    const newInfo = { ...cardInfo, [field]: formattedValue };
    setCardInfo(newInfo);
    onCardInfoChange(newInfo);
  };

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    return 'generic';
  };

  const cardType = getCardType(cardInfo.number);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Dados do Cartão</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Número do Cartão *
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardInfo.number}
              onChange={(e) => handleChange('number', e.target.value)}
              className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 pr-12"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {cardType === 'visa' && (
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  V
                </div>
              )}
              {cardType === 'mastercard' && (
                <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  M
                </div>
              )}
              {cardType === 'amex' && (
                <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  A
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Validade *
            </label>
            <input
              type="text"
              value={cardInfo.expiry}
              onChange={(e) => handleChange('expiry', e.target.value)}
              className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="MM/AA"
              maxLength={5}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              CVV *
            </label>
            <input
              type="text"
              value={cardInfo.cvv}
              onChange={(e) => handleChange('cvv', e.target.value)}
              className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="123"
              maxLength={4}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nome no Cartão *
          </label>
          <input
            type="text"
            value={cardInfo.holderName}
            onChange={(e) => handleChange('holderName', e.target.value.toUpperCase())}
            className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            placeholder="NOME COMO NO CARTÃO"
            required
          />
        </div>
      </div>
    </div>
  );
}
