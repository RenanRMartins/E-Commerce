import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import clsx from "clsx";
import Navbar from './components/Navbar';
import Hydrate from "./components/Hydrate";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fashion Elegance",
  description: "Fashion Elegance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!clerkKey) {
    return (
      <html lang="en">
        <body className={clsx('bg-slate-700', `${geistSans.variable} ${geistMono.variable} antialiased`)}>
          <div className="p-16">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-300 mb-4">E-Commerce</h1>
              <p className="text-gray-400">Clerk authentication not configured</p>
            </div>
            {children}
          </div>
        </body>
      </html>
    );
  }
  

  
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body className={clsx(`${geistSans.variable} ${geistMono.variable} antialiased`)}>
          <Hydrate>
            <Navbar />
            <main className='min-h-screen pt-20'>
                {children}
            </main>
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>  
);  
}
