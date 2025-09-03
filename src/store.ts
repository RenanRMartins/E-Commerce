import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "./app/types/ProductType";
import { ICartStore } from "./app/core/interfaces/ICartService";

export const useCartStore = create<ICartStore>()(
    persist((set) => ({
        cart: [],
        isOpen: false,
        paymentIntent: '',
        
        addProduct: (item: ProductType) =>
            set((state) => {
                const product = state.cart.find((p) => p.id === item.id);
                if (product) {
                    const updatedCart = state.cart.map((p) => {
                        if (p.id === item.id) {
                            return { ...p, quantity: (p.quantity || 1) + 1 };
                        }
                        return p;
                    });
                    return { cart: updatedCart };
                } else {
                    return { cart: [...state.cart, { ...item, quantity: 1 }] };
                }
            }),
            
        removeProduct: (item: ProductType) =>
            set((state) => {
                const existingProduct = state.cart.find((p) => p.id === item.id);

                if (existingProduct && existingProduct.quantity! > 1) {
                    const updatedCart = state.cart.map((p) => {
                        if (p.id === item.id) {
                            return { ...p, quantity: p.quantity! - 1 };
                        }
                        return p;
                    });
                    return { cart: updatedCart };
                } else {
                    const filteredCart = state.cart.filter((p) => p.id !== item.id);
                    return { cart: filteredCart };
                }
            }),
            
        removeFromCart: (item: ProductType) =>
            set((state) => {
                const filteredCart = state.cart.filter((p) => p.id !== item.id);
                return { cart: filteredCart };
            }),
            
        toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
        setPaymentIntent: (paymentIntent: string) => set(() => ({ paymentIntent })),
    }), 
    { name: 'cart-storage' })
);