'use client'
import { IPaymentResult } from '../../core/interfaces/IPaymentMethod';
import { useState } from 'react';

type PixPaymentResultProps = {
  result: IPaymentResult;
  onClose: () => void;
  onPaymentConfirmed?: () => void;
};

export default function PixPaymentResult({ result, onClose, onPaymentConfirmed }: PixPaymentResultProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (!result.success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Erro no Pagamento</h3>
        <p className="text-gray-300 mb-6">{result.message}</p>
        <button
          onClick={onClose}
          className="btn-primary px-6 py-2"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">PIX Gerado com Sucesso!</h3>
        <p className="text-gray-300">Escaneie o QR Code ou copie a chave PIX para pagar</p>
      </div>

      {/* QR Code */}
      <div className="glass-effect rounded-xl p-6 text-center">
        <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
          <div className="w-40 h-40 bg-gray-200 rounded flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-400">QR Code PIX</p>
      </div>

      {/* Chave PIX */}
      <div className="glass-effect rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">Chave PIX:</span>
          <button
            onClick={() => copyToClipboard(result.pixKey || '')}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 font-mono text-sm text-gray-300 break-all">
          {result.pixKey}
        </div>
      </div>

      {/* Instruções */}
      <div className="glass-effect rounded-xl p-4">
        <h4 className="font-semibold text-white mb-3">Como pagar:</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-start space-x-2">
            <span className="text-purple-400 font-bold">1.</span>
            <span>Abra o app do seu banco</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-400 font-bold">2.</span>
            <span>Escolha a opção PIX</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-400 font-bold">3.</span>
            <span>Escaneie o QR Code ou cole a chave PIX</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-400 font-bold">4.</span>
            <span>Confirme o pagamento</span>
          </div>
        </div>
      </div>

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
          onClick={() => copyToClipboard(result.pixKey || '')}
          className="group relative flex-1 py-4 px-6 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-md border border-purple-400/50 rounded-xl text-white font-semibold hover:from-purple-500/90 hover:to-pink-500/90 hover:border-purple-300/70 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 flex items-center justify-center space-x-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span className="relative z-10">{copied ? 'Copiado!' : 'Copiar Chave'}</span>
        </button>
      </div>

      {onPaymentConfirmed && (
        <div className="mt-6">
          <button
            onClick={onPaymentConfirmed}
            className="group relative w-full py-5 px-8 bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-md border border-green-400/60 rounded-2xl text-white font-bold text-lg hover:from-green-400/95 hover:to-emerald-400/95 hover:border-green-300/80 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/40 flex items-center justify-center space-x-4"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="relative z-10">Já realizei o pagamento</span>
          </button>
        </div>
      )}
    </div>
  );
}
