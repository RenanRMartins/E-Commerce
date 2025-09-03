import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default function middleware(request: any) {
  // Check if Clerk is configured
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    return NextResponse.next();
  }
  
  return clerkMiddleware()(request);
}

export const config = {
  matcher: [
    // Ignorar arquivos internos do Next.js e arquivos estáticos
    '/((?!_next|static|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre executar para rotas API
    '/api(.*)',
    '/trpc(.*)', // Inclua isso se estiver usando TRPC
  ],
};
