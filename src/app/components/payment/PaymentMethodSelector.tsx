'use client'
import { IPaymentMethod } from '../../core/interfaces/IPaymentMethod';
import { useState } from 'react';

type PaymentMethodSelectorProps = {
  methods: IPaymentMethod[];
  selectedMethod: IPaymentMethod | null;
  onMethodSelect: (method: IPaymentMethod) => void;
};

export default function PaymentMethodSelector({ 
  methods, 
  selectedMethod, 
  onMethodSelect 
}: PaymentMethodSelectorProps) {
  const getMethodIcon = (icon: string) => {
    switch (icon) {
      case 'pix':
        return (
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        );
      case 'credit-card':
        return (
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white mb-4">Método de Pagamento</h3>
      {methods.map((method) => (
        <div
          key={method.id}
          onClick={() => onMethodSelect(method)}
          className={`glass-effect rounded-xl p-4 cursor-pointer transition-all duration-300 ${
            selectedMethod?.id === method.id
              ? 'ring-2 ring-purple-500 bg-purple-500/10'
              : 'hover:bg-white/5'
          }`}
        >
          <div className="flex items-center space-x-4">
            {getMethodIcon(method.icon)}
            <div className="flex-1">
              <h4 className="font-semibold text-white">{method.name}</h4>
              <p className="text-sm text-gray-300">{method.description}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              selectedMethod?.id === method.id
                ? 'bg-purple-500 border-purple-500'
                : 'border-gray-400'
            }`}>
              {selectedMethod?.id === method.id && (
                <div className="w-full h-full rounded-full bg-white scale-50"></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
