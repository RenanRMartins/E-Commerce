'use client'
import { useState } from "react";
import Image from "next/image";
import { ProductType } from "../types/ProductType"

type ProductImageProps = {
    product: ProductType;
    fill?: boolean;
}

export default function ProductImage({ product, fill }: ProductImageProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleError = () => {
        setError(true);
        setLoading(false);
    };

    const handleLoad = () => {
        setLoading(false);
    };

    if (error) {
        return (
            <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center">
                <div className="text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-400 text-sm">Imagem não disponível</p>
                </div>
            </div>
        );
    }

    return fill ? (
        <div className="relative w-full h-full">
            <Image 
                src={product.image}
                fill
                alt={product.name}
                className={`object-cover transition-all duration-700 ${
                    loading ? 'scale-110 blur-3xl grayscale' : 'scale-100 blur-0 grayscale-0'
                }`}
                onLoad={handleLoad}
                onError={handleError}
                priority={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    ) : (
        <Image 
            src={product.image}
            width={400}
            height={700}
            alt={product.name}
            className={`object-cover transition-all duration-700 ${
                loading ? 'scale-110 blur-3xl grayscale' : 'scale-100 blur-0 grayscale-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            priority={false}
        />
    );
}