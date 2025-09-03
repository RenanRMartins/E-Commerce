import { ProductType } from "../../types/ProductType";
import { ReactNode } from "react";

interface BaseProductCardProps {
  product: ProductType;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function BaseProductCard({ 
  product, 
  children, 
  className = "", 
  onClick 
}: BaseProductCardProps) {
  return (
    <div 
      className={`flex flex-col glass-effect rounded-2xl p-6 text-white cursor-pointer card-hover group ${className}`}
      onClick={onClick}
    >
      <div className="relative max-h-72 flex-1 rounded-xl overflow-hidden mb-4">
        {children}
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="font-semibold text-lg truncate group-hover:text-purple-300 transition-colors">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold gradient-text">
            R$ {((product.price || 0) / 100).toFixed(2)}
          </span>
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
