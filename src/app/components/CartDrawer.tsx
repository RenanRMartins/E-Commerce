'use client'
import { useCartStore } from "@/store"
import Image from "next/image";
import { formatPrice } from "../lib/utils";
import CheckoutModal from "./payment/CheckoutModal";
import { useState } from "react";

export default function CartDrawer() {
    const useStore = useCartStore();
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);

    const totalPrice = useStore.cart.reduce((acc, item) => {
        return acc + item.price! * item.quantity!;
    }, 0);

    const handleCheckout = () => {
        setShowCheckoutModal(true);
    };

    const handleCloseCheckout = () => {
        setShowCheckoutModal(false);
    };

    return (
        <div onClick={() => useStore.toggleCart()} className="fixed w-full h-screen bg-black/50 backdrop-blur-sm left-0 top-0 z-50">
        <div onClick={(e) => e.stopPropagation()} className="absolute glass-effect right-0 top-0 w-1/3 h-screen p-8 overflow-y-scroll">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold gradient-text">Carrinho</h2>
                <button onClick={() => useStore.toggleCart()} className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            {useStore.cart.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <p className="text-gray-300 text-lg">Seu carrinho está vazio</p>
                    <p className="text-gray-400 text-sm">Adicione alguns produtos para começar!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {useStore.cart.map((item) => (
                        <div key={item.id} className="glass-effect rounded-xl p-4 flex gap-4">
                            <div className="relative">
                                <Image
                                src={item.image}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-lg" />
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                    {item.quantity}
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white truncate mb-1">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-gray-300 mb-2">
                                    Quantidade: {item.quantity}
                                </p>
                                <p className="text-lg font-bold gradient-text mb-3">
                                    {formatPrice(item.price)}
                                </p>
                                <div className="flex gap-2">
                                    <button 
                                        className="btn-secondary text-xs px-3 py-1" 
                                        onClick={() => useStore.addProduct(item)}
                                    >
                                        +
                                    </button>
                                    <button 
                                        onClick={() => useStore.removeProduct(item)} 
                                        className="btn-secondary text-xs px-3 py-1"
                                    >
                                        -
                                    </button>
                                    <button 
                                        onClick={() => useStore.removeFromCart(item)} 
                                        className="btn-secondary text-xs px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {useStore.cart.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-white">Total:</span>
                        <span className="text-2xl font-bold gradient-text">
                            {formatPrice(totalPrice)}
                        </span>
                    </div>
                    <button 
                        onClick={handleCheckout} 
                        className="btn-primary w-full py-3 text-lg font-semibold"
                    >
                        <span className="flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span>Finalizar Compra</span>
                        </span>
                    </button>
                </div>
            )}



            <CheckoutModal
                isOpen={showCheckoutModal}
                onClose={handleCloseCheckout}
                totalAmount={totalPrice}
                items={useStore.cart}
            />
        </div>
    </div>
    )
}