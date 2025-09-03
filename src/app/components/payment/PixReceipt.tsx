'use client'
import { IPaymentResult } from '../../core/interfaces/IPaymentMethod';

type PixReceiptProps = {
  result: IPaymentResult;
  onClose: () => void;
};

export default function PixReceipt({ result, onClose }: PixReceiptProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount / 100);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-effect rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-500 mb-2">PIX Realizado com Sucesso!</h2>
            <p className="text-gray-300">Sua transação foi processada com sucesso</p>
          </div>

          {/* Valor Transferido */}
          <div className="bg-green-500/10 rounded-xl p-4 mb-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-1">
              {formatAmount(result.amount || 0)}
            </div>
            <p className="text-gray-300 text-sm">Transferido com sucesso</p>
          </div>

          {/* Comprovante */}
          <div className="glass-effect rounded-xl p-4 mb-4">
            <h3 className="font-bold text-white mb-3">Comprovante</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">ID da transação:</span>
                <span className="text-white font-mono text-xs">{result.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data/Hora:</span>
                <span className="text-white">{formatDate(new Date())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400 font-semibold">CONCLUÍDO</span>
              </div>
            </div>
          </div>

          {/* Destinatário */}
          <div className="glass-effect rounded-xl p-4 mb-6">
            <h3 className="font-bold text-white mb-3">Destinatário</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Nome:</span>
                <span className="text-white">FASHION ELEGANCE LTDA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">CNPJ:</span>
                <span className="text-white">12.345.678/0001-90</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Instituição:</span>
                <span className="text-white">BANCO DO BRASIL S.A.</span>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="group relative flex-1 py-4 px-6 bg-gradient-to-r from-gray-600/20 to-gray-700/20 backdrop-blur-md border border-gray-500/30 rounded-xl text-white font-semibold hover:from-gray-500/30 hover:to-gray-600/30 hover:border-gray-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20 flex items-center justify-center space-x-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="relative z-10">Voltar</span>
            </button>
            
            <button
              onClick={() => {
                // Função para compartilhar (pode ser implementada futuramente)
                console.log('Compartilhar comprovante');
              }}
              className="group relative flex-1 py-4 px-6 bg-gradient-to-r from-green-500/80 to-emerald-500/80 backdrop-blur-md border border-green-400/50 rounded-xl text-white font-semibold hover:from-green-400/90 hover:to-emerald-400/90 hover:border-green-300/70 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/30 flex items-center justify-center space-x-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="relative z-10">Compartilhar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
