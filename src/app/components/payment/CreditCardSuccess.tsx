'use client'
import { IPaymentResult } from '../../core/interfaces/IPaymentMethod';

type CreditCardSuccessProps = {
  result: IPaymentResult;
  onClose: () => void;
};

export default function CreditCardSuccess({ result, onClose }: CreditCardSuccessProps) {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4">Pagamento Realizado com Sucesso!</h3>
      <p className="text-gray-300 mb-6">{result.message}</p>
      
      {/* Detalhes da transação */}
      <div className="glass-effect rounded-xl p-6 mb-6">
        <h4 className="font-semibold text-white mb-4">Detalhes da Transação</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">ID da Transação:</span>
            <span className="text-white font-mono">{result.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span className="text-green-400 font-semibold">Aprovado</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Método:</span>
            <span className="text-white">Cartão de Crédito</span>
          </div>
        </div>
      </div>

      {/* Informações adicionais */}
      <div className="glass-effect rounded-xl p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-300">
              Você receberá um e-mail de confirmação em breve. 
              O produto será enviado para o endereço cadastrado.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="btn-primary w-full py-3 text-lg font-semibold"
      >
        Finalizar
      </button>
    </div>
  );
}
