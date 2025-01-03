import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import clsx from "clsx";
import Navbar from './components/Navbar';
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import Hydrate from "./components/Hydrate";

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
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body className={clsx('bg-slate-700', `${geistSans.variable} ${geistMono.variable} antialiased`)}>
          <Hydrate>
            <Navbar />
            <main className='h-screen p-16'>
                {children}
            </main>
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>  
);  
}
