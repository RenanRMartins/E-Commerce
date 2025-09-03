import React from 'react';
import Link from 'next/link';
import Cart from './cart';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

function Navbar() {
    const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY;
    
    return (
        <nav className='fixed top-0 w-full flex items-center py-4 px-8 justify-between z-50 glass-effect'>
            <Link href="/" className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center'>
                    <span className='text-white font-bold text-sm'>FE</span>
                </div>
                <span className='text-xl font-bold gradient-text'>
                    Fashion Elegance
                </span>
            </Link>
            <div className='flex items-center gap-6'>
                <Cart />
                <div>
                {isClerkConfigured ? (
                    <>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode='modal'>
                                <button className='btn-primary'>
                                    Fazer Login
                                </button>
                            </SignInButton>
                        </SignedOut>
                    </>
                ) : (
                    <div className='text-sm text-gray-400'>
                        Auth não configurado
                    </div>
                )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
