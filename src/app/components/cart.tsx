'use client'
import { useCartStore } from "@/store"
import CartDrawer from "./CartDrawer";

export default function Cart() {
    const useStore = useCartStore();
    return (
    <>
        <div onClick={() => useStore.toggleCart()} className='flex items-center cursor-pointer relative p-2 rounded-lg hover:bg-white/10 transition-all duration-300'>
        <svg
        xmlns='https://www.w3.org/2000/svg'
        className='h-6 w-6 text-white'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
    >
        <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
        />
    </svg>
    {useStore.cart?.length > 0 && (
        <span className='bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center absolute -top-1 -right-1 text-white shadow-lg'>
            {useStore.cart?.length}
        </span>
    )}    
    </div>
    {useStore.isOpen && <CartDrawer />}
    </>
    );
}