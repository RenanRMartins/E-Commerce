'use client'
import { useState } from 'react';

type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
};

type CustomerInfoFormProps = {
  onInfoChange: (info: CustomerInfo) => void;
  initialInfo?: Partial<CustomerInfo>;
};

export default function CustomerInfoForm({ onInfoChange, initialInfo = {} }: CustomerInfoFormProps) {
  const [info, setInfo] = useState<CustomerInfo>({
    name: initialInfo.name || '',
    email: initialInfo.email || '',
    phone: initialInfo.phone || ''
  });

  const handleChange = (field: keyof CustomerInfo, value: string) => {
    const newInfo = { ...info, [field]: value };
    setInfo(newInfo);
    onInfoChange(newInfo);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Informações do Cliente</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            value={info.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            E-mail *
          </label>
          <input
            type="email"
            value={info.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            placeholder="seu@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Telefone
          </label>
          <input
            type="tel"
            value={info.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            placeholder="(11) 99999-9999"
          />
        </div>
      </div>
    </div>
  );
}
