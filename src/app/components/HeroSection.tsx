'use client'
import { useRef } from 'react';

export default function HeroSection() {
  const productsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
      <div className="relative max-w-7xl mx-auto px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Fashion Elegance</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubra as últimas tendências em moda com produtos exclusivos e elegantes
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={scrollToProducts}
              className="btn-primary text-lg px-8 py-3 hover:scale-105 transition-transform duration-200"
            >
              Explorar Produtos
            </button>
            <button 
              onClick={scrollToProducts}
              className="btn-secondary text-lg px-8 py-3 hover:scale-105 transition-transform duration-200"
            >
              Ver Coleção
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
